# Senior Code Reviewer Agent

An autonomous code review agent that acts like a senior software engineer with 15+ years of experience.

## Philosophy

The agent reviews code with these principles:
- "Will this code wake someone up at 3am?" - prioritize production stability
- "Can the next developer understand this?" - readability matters
- "What's the blast radius if this breaks?" - assess risk appropriately
- "Is this the simplest solution?" - fight unnecessary complexity

## Features

- **File Review**: Review a single file before committing
- **Diff Review**: Review git diff / staged changes
- **Stdin Review**: Pipe code directly for quick review
- **Codebase Review**: Full security and quality audit

## Installation

```bash
cd agents/code-reviewer
source venv/bin/activate  # venv already created with Python 3.14
```

## Usage

### Review a specific file
```bash
./run.sh file src/components/Button.tsx -v
```

### Review staged changes before commit
```bash
git diff --staged | ./run.sh diff - -v
```

### Review with context
```bash
./run.sh file auth.ts -c "Adding OAuth support" -v
```

### Review entire codebase
```bash
./run.sh codebase /path/to/project -f security bugs -v
```

### Pipe code from stdin
```bash
cat myfile.ts | ./run.sh stdin -v
```

## Options

| Flag | Description |
|------|-------------|
| `mode` | `file`, `diff`, `stdin`, or `codebase` |
| `-c, --context` | Context about the changes |
| `-f, --focus` | Focus areas: security, bugs, quality, react, typescript, performance |
| `-o, --output` | Save JSON results to file |
| `-v, --verbose` | Show detailed output |

## Verdicts

The agent gives one of these verdicts:

| Verdict | Meaning |
|---------|---------|
| ✅ **APPROVE** | Good to merge |
| ⚠️ **APPROVE WITH COMMENTS** | Can merge, but address feedback |
| 🔄 **REQUEST CHANGES** | Must fix issues before merging |
| ❌ **REJECT** | Fundamental problems, needs rethink |

## Output Structure

### For file/diff reviews:
1. **Quick Take** - First impression
2. **Must Fix** - Blocking issues
3. **Should Fix** - Non-blocking but important
4. **Suggestions** - Nice-to-haves
5. **What's Good** - Positive feedback
6. **Verdict** - Final decision

### For codebase reviews:
1. **Executive Summary** - Overall health
2. **Critical Issues** - 🔴 Must fix
3. **Warnings** - 🟡 Should fix
4. **Tech Debt** - 🟠 Track
5. **Positive Observations** - 🟢 What's good
6. **Recommendations** - Top 3 priorities
