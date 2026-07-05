<div align="center">

# 🧠 NeuroForge

### Terminal-based AI Software Engineering Agent

*Build • Plan • Analyze • Automate*

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-blue?style=for-the-badge)
![AI SDK](https://img.shields.io/badge/AI_SDK-Agent-orange?style=for-the-badge)
![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram)

*A modular AI coding assistant inspired by modern software engineering agents like Claude Code, OpenClaw, Cursor, and Codex CLI.*

</div>

---

# 🚀 Overview

NeuroForge is a **terminal-first AI Software Engineering Agent** capable of understanding a project, planning implementations, answering code-related questions, and autonomously performing development tasks through tool calling.

Unlike traditional chatbots, NeuroForge follows an **agentic workflow** where the LLM can inspect the codebase, invoke tools, stage modifications, and safely apply changes only after user approval.

The project was built from scratch to understand the architecture behind modern AI coding assistants rather than treating them as black boxes.

---

# 💡 Why NeuroForge?

Modern AI coding assistants such as **Claude Code**, **Cursor**, **Codex CLI**, and **OpenClaw** have changed how developers interact with code.

Instead of simply using these tools, I wanted to understand how they work internally.

NeuroForge was built to explore concepts such as:

- Autonomous Tool Calling
- AI Agent Orchestration
- Multi-Step Planning
- Safe File Operations
- Human-in-the-loop Approval
- Project-aware Reasoning
- Web-Augmented Research
- Modular Agent Architecture

---

# ✨ Core Features

## 🤖 Agent Mode

Autonomously performs software engineering tasks using AI.

Capabilities include:

- Read project files
- Analyze repository structure
- Create files
- Delete files
- Create folders
- Execute shell commands (approval required)
- Search repositories
- Stage file modifications
- Apply approved changes

Rather than following hardcoded workflows, the agent decides **which tools to invoke** based on the user's goal.

---

## 📋 Plan Mode

Generate implementation plans before writing code.

Plan Mode can:

- Analyze the current codebase
- Research project structure
- Search documentation using Firecrawl
- Generate structured implementation plans
- Estimate complexity for every step
- Allow users to execute only selected steps

Example output:

```text
Goal:
Build JWT Authentication

Generated Plan

✓ Analyze authentication flow
✓ Create JWT middleware
✓ Protect routes
✓ Update API documentation
✓ Write tests
```

---

## ❓ Ask Mode

Project-aware AI assistant.

Unlike a normal chatbot, Ask Mode can:

- Read project files
- Search repositories
- Analyze folder structure
- Inspect existing code
- Read project skills
- Research documentation
- Save answers as Markdown

Ask Mode operates in **read-only mode** to ensure project safety.

---

## 🌐 Telegram Mode

NeuroForge can also be used remotely through Telegram.

Built using **Telegraf**, the Telegram interface provides the same AI capabilities available in the CLI, allowing developers to interact with the agent from anywhere.

---

# 🏗 Architecture

```text
                    User
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      CLI Interface         Telegram Bot
          │                       │
          └───────────┬───────────┘
                      │
               Mode Selection
      ┌─────────┬──────────┬──────────┐
      ▼         ▼          ▼
    Ask       Plan       Agent
      │         │          │
      └─────────┴──────────┘
                │
        ToolLoopAgent (AI SDK)
                │
      ┌─────────┼──────────────┐
      ▼         ▼              ▼
 File Tools  Web Tools   Code Analysis
                │
                ▼
          Tool Executor
                │
                ▼
         Action Tracker
                │
                ▼
       Approval Workflow
                │
                ▼
         Apply Changes
```

---

# ⚙ Agent Workflow

```text
User Request
      │
      ▼
AI Model
      │
      ▼
Decides Required Tools
      │
      ▼
Tool Executor
      │
      ▼
Stage Changes
      │
      ▼
Action Tracker
      │
      ▼
Approval Required
      │
      ▼
Apply Changes
```

---

# 🔒 Safety First

NeuroForge is designed with safety in mind.

Features include:

- ✅ Staged file modifications
- ✅ Human approval before applying changes
- ✅ Read-only Ask Mode
- ✅ Configurable tool permissions
- ✅ Workspace sandboxing
- ✅ Path validation
- ✅ File size protection
- ✅ Action tracking
- ✅ Tool execution logging

This prevents accidental modifications while still allowing autonomous workflows.

---

# 🧰 Tooling

Current built-in tools include:

| Tool | Purpose |
|------|---------|
| Read File | Read project files |
| Create File | Create new files |
| Delete File | Delete files |
| Create Folder | Create directories |
| List Files | Explore project structure |
| Search Files | Search repository using glob patterns |
| Analyze Codebase | Summarize project structure |
| Execute Shell | Queue terminal commands |
| Web Search | Search documentation |
| Web Crawl | Extract website content |
| Fetch URL | Download webpage content |
| Read Skills | Read SKILL.md files |

---

# 📂 Project Structure

```text
NeuroForge
│
├── ai/
│   └── AI provider configuration (OpenRouter)
│
├── calculator/
│   └── Utility tools
│
├── modes/
│   ├── agentMode/
│   │   ├── Agent orchestration
│   │   ├── Tool execution
│   │   ├── Action tracking
│   │   ├── Approval workflow
│   │   └── Diff generation
│   │
│   ├── ask/
│   │   └── Read-only project assistant
│   │
│   └── plan/
│       ├── Planner
│       ├── Step selection
│       ├── Web research
│       └── Execution pipeline
│
├── telegram/
│   └── Telegram integration using Telegraf
│
├── terminalUI/
│   ├── Banner generation
│   └── Markdown rendering
│
└── index.ts
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Primary language |
| Node.js | Runtime |
| AI SDK | Agent orchestration |
| OpenRouter | LLM provider |
| Firecrawl | Web search & crawling |
| Zod | Tool schema validation |
| Chalk | Terminal styling |
| Clack Prompts | Interactive CLI |
| Marked | Markdown rendering |
| Telegraf | Telegram Bot |

---

# 🎯 Engineering Highlights

This project focuses on understanding the architecture behind modern AI coding agents.

Key engineering concepts implemented include:

- Multi-mode AI architecture
- Autonomous tool calling
- Human-in-the-loop approval workflow
- Web-augmented planning
- Project-aware reasoning
- Tool abstraction layer
- Configurable permissions
- Modular execution pipeline
- Safe staged file operations

---

# 🚀 Future Roadmap

- [ ] Git integration
- [ ] Diff visualization improvements
- [ ] Memory support
- [ ] Retrieval-Augmented Generation (RAG)
- [ ] Multi-agent collaboration
- [ ] Docker support
- [ ] VS Code Extension
- [ ] Plugin ecosystem
- [ ] Test generation
- [ ] Streaming responses

---

# 📖 Inspiration

NeuroForge is inspired by modern AI software engineering assistants including:

- Claude Code
- OpenClaw
- Cursor
- OpenAI Codex CLI

The objective was **not to clone these tools**, but to understand and implement the architecture behind autonomous AI software engineering agents.

---

# 👨‍💻 Author

Built to explore the next generation of AI-powered software engineering through autonomous agents, tool calling, planning, and safe code execution.

If you found this project interesting, consider giving it a ⭐.