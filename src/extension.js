const path = require("path");
const vscode = require("vscode");
const getBinaryPath = require("./getBinaryPath.js");
const { initCommand } = require("./initCommand.js");
const { startLanguageServer } = require("./languageServer.js");
const { stopLanguageServer } = require("./languageServer.js");
const { restartLanguageServer } = require("./languageServer.js");

/**
 * Checks if the extension is enabled in the workspace settings.
 * @returns {boolean} True if the extension is enabled, false otherwise.
 */
function isExtensionEnabled() {
  const config = vscode.workspace.getConfiguration("urpc");
  const enable = config.get("enable");
  return enable !== undefined ? enable === true : true;
}

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context The extension context.
 */
async function activate(context) {
  if (!isExtensionEnabled()) {
    console.log("UFO RPC: Extension is disabled in workspace settings.");
    return;
  }

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
  if (!isExtensionEnabled()) {
    console.log("UFO RPC: Extension is disabled in workspace settings.");
    return;
  }

  console.log("Deactivating UFO RPC extension.");
  await stopLanguageServer();
}

module.exports = {
  activate,
  deactivate,
};
