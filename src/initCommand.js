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
    openLabel: "Select folder to initialize schema.urpc",
  });

  if (!folderUri || folderUri.length === 0) {
    return;
  }

  const schemaPath = path.join(folderUri[0].fsPath, "schema.urpc");
  const initCommand = `${binaryPath} init ${schemaPath}`;

  console.log(`UFO RPC: Initializing schema at ${schemaPath}`);
  execProcess(initCommand, (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(
        `Failed to initialize schema: ${error.message}`,
      );
      console.error(`Error initializing schema: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`UFO RPC: Init stderr: ${stderr}`);
    }

    if (stdout) {
      console.log(`UFO RPC: Init stdout: ${stdout}`);
    }

    if (!fs.existsSync(schemaPath)) {
      vscode.window.showErrorMessage(
        `Failed to create schema file at ${schemaPath}, check your permissions.`,
      );
      return;
    }

    vscode.workspace.openTextDocument(schemaPath).then((doc) => {
      vscode.window.showTextDocument(doc);
    });

    vscode.window.showInformationMessage(
      `Schema initialized at ${schemaPath}`,
    );
  });
}

module.exports = {
  initCommand,
};
