const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const execProcess = require("child_process").exec;

/**
 * Runs the init command for the UFO RPC binary.
 *
 * @param {string} binaryPath The path to the UFO RPC binary.
 * @returns {Promise<void>} A promise that resolves when the command is complete.
 */
async function initCommand(binaryPath) {
  const folderUri = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: "Select folder to initialize UFO RPC",
  });

  if (!folderUri || folderUri.length === 0) {
    return;
  }

  const folderPath = folderUri[0].fsPath;
  const initCommand = `${binaryPath} init ${folderPath}`;

  console.log(`UFO RPC: Initializing at ${folderPath}`);
  execProcess(initCommand, (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(
        `UFO RPC: Failed to initialize: ${error.message}`,
      );
      console.error(`UFO RPC: Error initializing schema: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`UFO RPC: Init stderr: ${stderr}`);
    }

    if (stdout) {
      console.log(`UFO RPC: Init stdout: ${stdout}`);
    }

    vscode.window.showInformationMessage(
      `UFO RPC: Initialized at ${folderPath}`,
    );
  });
}

module.exports = {
  initCommand,
};
