#!/bin/bash
# Run the code review agent

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Activate venv and run
source venv/bin/activate
python code_reviewer.py "$@"
