# Pre-commit Check

Run all checks before committing code changes.

## Steps

1. **TypeScript Check**: Run `yarn lint:tsc` to catch type errors
2. **Build Check**: Run `yarn build` to ensure the project builds
3. **Console.log Check**: Search for any `console.log` statements in staged files (warn but don't block)
4. **Large File Check**: Warn if any staged file is over 500 lines of changes

## Execution

Run these checks in sequence. If any critical check fails (TypeScript or Build), stop and report the errors clearly.

For console.log warnings, list the files and line numbers but allow the commit to proceed.

## Output

Provide a clear summary:
- ✅ or ❌ for each check
- List of any issues found
- Final recommendation: "Ready to commit" or "Fix issues before committing"
