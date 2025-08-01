# Define command aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias c='clear'

# Set the user file-creation mode mask to 000, which allows all
# users read, write, and execute permissions for newly created files.
umask 000

# Fixes the permissions of the files and directories in the project.
chmod -R 777 /workspaces

# Configure Git to ignore ownership and file mode changes.
git config --global --add safe.directory '*'
git config core.fileMode false

echo "
────────────────────────────────────────────────────
── Github: https://github.com/uforg/uforpc-vscode ──
────────────────────────────────────────────────────
── Development environment is ready to use! ────────
────────────────────────────────────────────────────
"
