#!/usr/bin/env bun

import { Command } from "commander";
import { generate } from "./terminalUI/generate";
const program = new Command();

program.name("neuroforge cli").description("A CLI tool for NeuroForge").version("0.1.0");

program
  .command("generate")
  .description("Generate code based on a prompt")
  .action(async () => {
    await generate();
  });

program.parseAsync(process.argv);