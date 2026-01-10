#!/usr/bin/env python3
"""
Senior Code Reviewer Agent
Acts as a senior software engineer reviewing code before commits.
Built with Claude Agent SDK.
"""

import asyncio
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path
from claude_code_sdk import query, ClaudeCodeOptions, AssistantMessage


SENIOR_ENGINEER_PROMPT = """You are a senior software engineer with 15+ years of experience conducting a code review.

Your personality:
- Direct and practical - no fluff, just actionable feedback
- You've seen every bug pattern and anti-pattern
- You care about the team's velocity, not just code perfection
- You know when to be strict (security, data integrity) vs flexible (style preferences)
- You explain the "why" behind your feedback so juniors can learn

Your review philosophy:
- "Will this code wake someone up at 3am?" - prioritize production stability
- "Can the next developer understand this?" - readability matters
- "What's the blast radius if this breaks?" - assess risk appropriately
- "Is this the simplest solution?" - fight unnecessary complexity

"""


def create_file_review_prompt(file_path: str, code_content: str, context: str | None = None) -> str:
    """Create prompt for reviewing a specific file or code snippet."""

    context_section = f"\n**Context:** {context}\n" if context else ""

    return f"""{SENIOR_ENGINEER_PROMPT}

## Code to Review

**File:** {file_path}
{context_section}
```
{code_content}
```

## Your Review

Analyze this code as if it's a pull request. Be thorough but respectful.

### Structure your review as:

**1. Quick Take** (1-2 sentences)
What's this code doing? First impression - good, concerning, or needs work?

**2. Must Fix** (blocking issues)
Issues that would make you reject the PR:
- Security vulnerabilities
- Bugs that will cause production issues
- Data integrity problems
- Performance issues that will impact users

For each issue:
- Line number(s)
- What's wrong
- Why it matters
- How to fix it (with code example if helpful)

**3. Should Fix** (non-blocking but important)
Issues you'd want addressed but wouldn't block the PR:
- Code smells
- Missing error handling
- Unclear logic
- Minor performance concerns

**4. Suggestions** (optional improvements)
Nice-to-haves that would improve the code:
- Better naming
- Refactoring opportunities
- Documentation gaps

**5. What's Good**
Acknowledge what's done well - specific praise helps developers learn what to repeat.

**6. Verdict**
One of:
- ✅ **APPROVE** - Good to merge
- ⚠️ **APPROVE WITH COMMENTS** - Can merge, but address feedback
- 🔄 **REQUEST CHANGES** - Must fix issues before merging
- ❌ **REJECT** - Fundamental problems, needs rethink

Be specific with line numbers. Give code examples for fixes when helpful.
Don't nitpick formatting or style unless it hurts readability.
"""


def create_diff_review_prompt(diff_content: str, context: str | None = None) -> str:
    """Create prompt for reviewing a git diff."""

    context_section = f"\n**Context:** {context}\n" if context else ""

    return f"""{SENIOR_ENGINEER_PROMPT}

## Changes to Review

{context_section}
```diff
{diff_content}
```

## Your Review

Review these changes as a senior engineer would review a PR diff.

Focus on:
- What's being added/removed and why it might be problematic
- Are the changes complete? (missing null checks, error handling, tests)
- Do the changes introduce inconsistencies with the rest of the codebase?
- Security implications of the changes

### Structure your review as:

**1. Change Summary**
What do these changes accomplish? (1-2 sentences)

**2. Risk Assessment**
- Low/Medium/High risk change
- What could break?
- Blast radius if something goes wrong

**3. Issues Found**
For each issue:
- File and line (from diff)
- Problem
- Suggested fix

**4. Questions for the Author**
Things you'd ask before approving (if any)

**5. Verdict**
- ✅ **APPROVE** - Changes look good
- ⚠️ **APPROVE WITH COMMENTS** - Minor issues, can merge
- 🔄 **REQUEST CHANGES** - Fix before merging
- ❌ **REJECT** - Don't merge this

Be direct. We're all professionals here.
"""


def create_codebase_review_prompt(target_path: str, focus_areas: list[str] | None = None) -> str:
    """Create prompt for reviewing entire codebase."""

    focus_section = ""
    if focus_areas:
        focus_section = f"\n**Focus Areas:** {', '.join(focus_areas)}"

    return f"""{SENIOR_ENGINEER_PROMPT}

## Codebase Review

**Target:** {target_path}
{focus_section}

## Your Task

Conduct a thorough code review of this codebase. This is like an architecture review combined with a security audit.

### Step 1: Reconnaissance
- Use Glob to map the project structure
- Identify the tech stack, entry points, and critical paths
- Note: Skip node_modules, .next, dist, coverage, *.test.*, *.stories.*

### Step 2: Security Sweep
Hunt for:
- Hardcoded secrets (API keys, passwords, tokens)
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication/authorization flaws
- Insecure data handling
- TLS/certificate issues
- Rate limiting gaps

### Step 3: Bug Hunt
Look for:
- Null pointer / undefined access patterns
- Race conditions and async issues
- Resource leaks (memory, connections, file handles)
- Error handling gaps (uncaught promises, silent failures)
- Logic errors and off-by-one bugs
- Copy-paste mistakes

### Step 4: Code Health
Assess:
- Console.log / debugger statements in production code
- TODO/FIXME/HACK comments (tech debt indicators)
- Dead code and unused exports
- Functions over 50 lines (complexity smell)
- Deeply nested conditionals (>3 levels)
- Duplicated logic

### Step 5: Framework-Specific (React/Next.js)
If applicable:
- Missing key props in iterations
- useEffect dependency issues
- Memory leaks (cleanup in effects)
- Prop drilling vs context opportunities
- Performance (missing memo, useMemo, useCallback)

## Output Format

### Executive Summary
2-3 sentences: Overall health of the codebase. Would you be comfortable maintaining this?

### Critical Issues (🔴 Must Fix)
Production risks that need immediate attention.
Format: `File:Line` - Issue - Risk - Fix

### Warnings (🟡 Should Fix)
Issues that should be addressed soon.
Format: `File:Line` - Issue - Why it matters

### Tech Debt (🟠 Track)
Things to address when time permits.

### Positive Observations (🟢)
What's done well - patterns to replicate.

### Recommendations
Top 3 priorities if you could only fix 3 things.

Be practical. Every codebase has issues. Prioritize by actual risk.
"""


async def run_review(
    mode: str,
    target: str,
    context: str | None = None,
    focus_areas: list[str] | None = None,
    output_file: str | None = None,
    verbose: bool = False
) -> dict:
    """Run the code review agent."""

    # Create appropriate prompt based on mode
    if mode == "file":
        # Read the file content
        file_path = Path(target)
        if not file_path.exists():
            print(f"Error: File not found: {target}")
            sys.exit(1)
        code_content = file_path.read_text()
        prompt = create_file_review_prompt(str(file_path), code_content, context)
        cwd = str(file_path.parent)
    elif mode == "diff":
        prompt = create_diff_review_prompt(target, context)
        cwd = "."
    elif mode == "stdin":
        # Code passed via stdin
        code_content = target  # In this case, target is the code itself
        prompt = create_file_review_prompt("stdin", code_content, context)
        cwd = "."
    else:  # codebase
        prompt = create_codebase_review_prompt(target, focus_areas)
        cwd = target

    results = {
        "timestamp": datetime.now().isoformat(),
        "mode": mode,
        "target": target if mode != "stdin" else "<stdin>",
        "context": context,
        "findings": [],
        "verdict": None,
        "raw_output": ""
    }

    print(f"\n{'='*60}")
    print(f"👨‍💻 Senior Code Review")
    print(f"{'='*60}")
    if mode == "file":
        print(f"File: {target}")
    elif mode == "diff":
        print(f"Reviewing diff...")
    elif mode == "stdin":
        print(f"Reviewing code from stdin...")
    else:
        print(f"Codebase: {target}")
    print(f"Started: {results['timestamp']}")
    print(f"{'='*60}\n")

    full_output = []

    try:
        async for message in query(
            prompt=prompt,
            options=ClaudeCodeOptions(
                allowed_tools=["Read", "Glob", "Grep"],
                cwd=cwd,
                permission_mode="default"
            )
        ):
            if isinstance(message, AssistantMessage):
                for block in message.content:
                    if hasattr(block, "text"):
                        text = block.text
                        full_output.append(text)
                        if verbose:
                            print(text)
                    elif hasattr(block, "name"):
                        if verbose:
                            print(f"\n[{block.name}]\n")

    except Exception as e:
        print(f"\nError during review: {e}")
        results["error"] = str(e)

    results["raw_output"] = "\n".join(full_output)

    # Extract verdict
    output_text = results["raw_output"]
    if "✅ **APPROVE**" in output_text:
        results["verdict"] = "APPROVE"
    elif "⚠️ **APPROVE WITH COMMENTS**" in output_text:
        results["verdict"] = "APPROVE_WITH_COMMENTS"
    elif "🔄 **REQUEST CHANGES**" in output_text:
        results["verdict"] = "REQUEST_CHANGES"
    elif "❌ **REJECT**" in output_text:
        results["verdict"] = "REJECT"

    # Parse findings
    results["findings"] = parse_findings(results["raw_output"])

    # Save results if output file specified
    if output_file:
        output_path = Path(output_file)
        output_path.write_text(json.dumps(results, indent=2))
        print(f"\nResults saved to: {output_file}")

    # Print summary
    print(f"\n{'='*60}")
    if results["verdict"]:
        verdict_emoji = {
            "APPROVE": "✅",
            "APPROVE_WITH_COMMENTS": "⚠️",
            "REQUEST_CHANGES": "🔄",
            "REJECT": "❌"
        }.get(results["verdict"], "")
        print(f"Verdict: {verdict_emoji} {results['verdict']}")
    print(f"{'='*60}")

    return results


def parse_findings(output: str) -> list[dict]:
    """Parse findings from the agent output."""
    findings = []
    lines = output.split("\n")
    current_finding = None

    for line in lines:
        if "**File:**" in line or "`File:" in line:
            if current_finding:
                findings.append(current_finding)
            current_finding = {"file": line.split(":")[-1].strip().strip("`")}
        elif current_finding:
            if "**Issue:**" in line or "Issue:" in line or "Problem:" in line:
                current_finding["issue"] = line.split(":", 1)[-1].strip()
            elif "**Risk:**" in line or "Risk:" in line:
                current_finding["risk"] = line.split(":", 1)[-1].strip()
            elif "**Fix:**" in line or "Fix:" in line or "Suggested fix:" in line:
                current_finding["fix"] = line.split(":", 1)[-1].strip()

    if current_finding:
        findings.append(current_finding)

    return findings


def main():
    parser = argparse.ArgumentParser(
        description="Senior Code Reviewer - Review code like a senior engineer",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Review a specific file
  python code_reviewer.py file src/components/Button.tsx

  # Review staged changes (git diff)
  git diff --staged | python code_reviewer.py diff -

  # Review a code snippet from stdin
  cat myfile.ts | python code_reviewer.py stdin

  # Review entire codebase
  python code_reviewer.py codebase /path/to/project

  # Review with context
  python code_reviewer.py file auth.ts -c "Adding OAuth support"

  # Focus on specific areas
  python code_reviewer.py codebase . -f security bugs
        """
    )

    parser.add_argument(
        "mode",
        choices=["file", "diff", "stdin", "codebase"],
        help="Review mode: file (single file), diff (git diff), stdin (piped code), codebase (full project)"
    )
    parser.add_argument(
        "target",
        nargs="?",
        default=".",
        help="File path, '-' for stdin, or directory for codebase mode"
    )
    parser.add_argument(
        "-c", "--context",
        help="Context about the changes (e.g., 'Fixing auth bug', 'Adding caching')"
    )
    parser.add_argument(
        "-f", "--focus",
        nargs="+",
        choices=["security", "bugs", "quality", "react", "typescript", "performance"],
        help="Focus areas for codebase review"
    )
    parser.add_argument(
        "-o", "--output",
        help="Output file for JSON results"
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Show detailed output during review"
    )

    args = parser.parse_args()

    # Handle stdin input
    target = args.target
    if args.mode in ["diff", "stdin"] and (target == "-" or not sys.stdin.isatty()):
        target = sys.stdin.read()
    elif args.mode in ["file", "codebase"]:
        target = str(Path(target).resolve())

    # Run the review
    asyncio.run(run_review(
        mode=args.mode,
        target=target,
        context=args.context,
        focus_areas=args.focus,
        output_file=args.output,
        verbose=args.verbose
    ))


if __name__ == "__main__":
    main()
