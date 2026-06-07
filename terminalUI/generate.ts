import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const BANNER_FONT = 'ANSI Shadow';
const Shadow = chalk.hex('#1c09f5');
const Face = chalk.hex('#05c528').bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/gm, "").split("\n");
  const maxLen = Math.max(...bannerLines.map(line => line.length), 0);
  const rowWidth = maxLen + 2; // Add some padding

  for (const line of bannerLines) {
    console.log(Shadow((' ' + line)).padEnd(rowWidth));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(Face(line).padEnd(rowWidth));
  }
  console.log();
}

export async function generate() {
  let ascii: string;
  try {
    ascii = figlet.textSync("NeuroForge", { font: BANNER_FONT });
  }
  catch (error) {
    ascii = figlet.textSync("NeuroForge", { font: "Standard" });
  }
  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode do you want to proceed with?",
    options: [
      { value: "cli", label: "CLI" },
      { value: "telegram", label: "Telegram Bot" },
    ],
  })

  if (isCancel(mode)) {
    console.log(chalk.red("Operation cancelled."));
    return;
  }
  if (mode === "cli") {
    console.log(chalk.green("You chose CLI mode!"));
  }
  else {
    console.log(chalk.green("You chose Telegram Bot mode!"));
  }
}
