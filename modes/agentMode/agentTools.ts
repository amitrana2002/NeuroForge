import { tool } from "ai";
import { z } from "zod";
import type { ToolExecuter } from "./toolExecuter";

export function createAgentTools(executor: ToolExecuter) {
  return {
    read_file: tool({
      description: "Read a text file from the codebase. Use a path relative to the codebase root.",
      inputSchema: z.object({
        rel: z.string().describe("The relative path to the file"),
      }),
      execute: async ({ rel }) => executor.readFile(rel),
    }),

    create_file: tool({
      description: "Create a new text file in the codebase. Use a path relative to the codebase root.",
      inputSchema: z.object({
        rel: z.string().describe("The relative path to the file"),
        content: z.string().describe("The content of the file"),
      }),
      execute: async ({ rel, content }) => executor.createFile(rel, content),
    }),

    delete_file: tool({
      description: "Delete a text file from the codebase. Use a path relative to the codebase root.",
      inputSchema: z.object({
        rel: z.string().describe("The relative path to the file"),
      }),
      execute: async ({ rel }) => executor.deleteFile(rel),
    }),

    create_folder: tool({
      description: "Create a new folder in the codebase. Use a path relative to the codebase root.",
      inputSchema: z.object({
        rel: z.string().describe("The relative path to the folder"),
      }),
      execute: async ({ rel }) => executor.createFolder(rel),
    }),

    list_files: tool({
      description: "List files in a folder. Use a path relative to the codebase root.",
      inputSchema: z.object({
        rel: z.string().describe("The relative path to the folder"),
        recursive: z.boolean().describe("Whether to list files recursively"),
      }),
      execute: async ({ rel, recursive }) => executor.listFiles(rel, recursive),
    }),


    search_files: tool({
      description:
        'Find files matching a glob pattern (e.g. "*.ts", "**/*.md"). Optional content substring filter.',
      inputSchema: z.object({
        root: z.string().describe("Directory to search, relative to root"),
        pattern: z
          .string()
          .describe("Glob-like pattern using * and ** (forward slashes)"),
        content_contains: z.string().optional(),
      }),
      execute: async ({ root, pattern, content_contains }) =>
        executor.searchFiles(root, pattern, content_contains),
    }),

    analyze_codebase: tool({
      description:
        "Summarize structure: file counts, size, extensions. Read-only.",
      inputSchema: z.object({
        path: z.string().default("."),
      }),
      execute: async ({ path: p }) => executor.analyzeCodebase(p),
    }),

    execute_shell: tool({
      description:
        "Queue a shell command to run in the workspace after user approval. Use with care.",
      inputSchema: z.object({
        command: z.string().describe("Single command; runs with shell: true"),
      }),
      execute: async ({ command }) => executor.queueShell(command),
    }),

    list_skills: tool({
      description:
        "List absolute paths to SKILL.md files under configured skill directories (Cursor / Claude).",
      inputSchema: z.object({}),
      execute: async () => executor.listSkills(),
    }),

    read_skill: tool({
      description:
        "Read a SKILL.md file. Path must be absolute and under skill roots, or use a path returned by list_skills.",
      inputSchema: z.object({
        path: z.string(),
      }),
      execute: async ({ path: p }) => executor.readSkill(p),
    }),
  };
}
