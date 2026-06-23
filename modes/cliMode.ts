import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import { runAgentMode } from "./agentMode/orchestrator";

export async function runCliMode() {
  while (true) {
    const mode = await select({
      message: "You are in CLI mode. What do you want to do?",
      options: [
        { value: "agent", label: "Agent Mode" },
        { value: "plan", label: "Plan Mode" },
        { value: "ask", label: "Ask Mode" },
        { value: "cancel", label: "Exit CLI Mode" }
      ],
    });
    if (isCancel(mode) || mode === "cancel") {
      console.log(chalk.red("\n Exiting CLI Mode. Goodbye! \n"));
      return;
    }

    switch (mode) {
      case "agent":
        {
          // console.log(chalk.green("You chose Agent Mode!"));

          await runAgentMode();
          break;
        }

      case "plan":
        console.log(chalk.green("You chose Plan Mode!"));
        break;
      case "ask":
        console.log(chalk.green("You chose Ask Mode!"));
        break;
      default:
        console.log(chalk.red("Invalid option. Please try again."));
    }
  }
}