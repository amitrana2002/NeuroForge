import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./actionTracker";
import { ToolExecuter } from "./toolExecuter";
import { createAgentTools } from "./agentTools";
import { stepCountIs, ToolLoopAgent } from "ai";
import { getAgentModel } from "../../ai";
import { renderTerminalMarkdown } from "../../terminalUI/terminal_md";
import { runApprovalFlow } from "./approval";

export async function runAgentMode() {
  console.log(chalk.green("Agent Mode Activated!"));

  const goal = await text({
    message: "What is your goal for the agent?",
    placeholder: "E.g., Build a to-do list app",
  })

  if (isCancel(goal) || !goal.trim()) return;

  const config = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecuter(tracker, config);
  const tools = createAgentTools(executor);

  const agent = new ToolLoopAgent({
    model: getAgentModel(),
    stopWhen: stepCountIs(40),
    instructions: [
      `Workspace route: ${config.codebasePath}`,
      "All mutations are staged until approval. ",
    ].join("\n"),
    tools,
  });

  const result = await agent.generate({
    prompt: goal.trim(),
    onStepFinish: ({ toolCalls }) => {
      for (const tc of toolCalls) {
        const preview = JSON.stringify(tc.input).slice(0, 60);
        console.log(
          chalk.green(' ✅'),
          chalk.bold(String(tc.toolName)),
          chalk.dim(preview + (preview.length >= 160 ? "..." : ""),)
        )
      }
    }
  })

  if (result.text?.trim())
    console.log(renderTerminalMarkdown(result.text))

  const ok = await runApprovalFlow(tracker);

  if (!ok) return executor.clearStaging();

  const { errors } = executor.applyApprovedFromTracker();

  if (errors.length) {
    console.log(chalk.red("\nSome operations reported errors:\n"));
    for (const e of errors) console.log(chalk.red(`${e}`));

  }
  else {
    console.log(chalk.green('\n✅ Applied.\n'))
  }

  executor.clearStaging();
}