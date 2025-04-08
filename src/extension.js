const path = require("path");
const vscode = require("vscode");
const getBinaryPath = require("./getBinaryPath.js");
const { initCommand } = require("./initCommand.js");
const { startLanguageServer } = require("./languageServer.js");
const { stopLanguageServer } = require("./languageServer.js");
const { restartLanguageServer } = require("./languageServer.js");

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context The extension context.
 */
async function activate(context) {
  console.log("UFO RPC: Activating extension.");

  let binaryPath = "";
  try {
    binaryPath = getBinaryPath();
    console.log(`UFO RPC: Binary path found: ${binaryPath}`);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
    console.error(error.message);
    return;
  }

  await startLanguageServer(binaryPath);

  context.subscriptions.push(vscode.commands.registerCommand(
    "urpc.init",
    () => initCommand(binaryPath),
  ));

  context.subscriptions.push(vscode.commands.registerCommand(
    "urpc.restart",
    () => restartLanguageServer(binaryPath),
  ));
}

/**
 * Deactivates the extension.
 */
async function deactivate() {
  console.log("Deactivating UFO RPC extension.");
  await stopLanguageServer();
}

module.exports = {
  activate,
  deactivate,
};
