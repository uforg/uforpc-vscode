"use strict";

const path = require("path");
const process = require("process");
const vscode = require("vscode");
const { LanguageClient, TransportKind } = require("vscode-languageclient/node");
const getBinaryPath = require("./getBinaryPath");

// Language Client instance
let client;

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context The extension context.
 */
function activate(context) {
  console.log("Activating UFO RPC extension.");

  let binaryPath = "";
  try {
    binaryPath = getBinaryPath();
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
    console.error(error.message);
    return;
  }

  const serverCommand = context.asAbsolutePath(path.join("server", binaryName));
  console.log(`LSP Server Command Path: ${serverCommand}`);

  // Server Options
  const serverOptions = {
    command: serverCommand,
    transport: TransportKind.stdio,
  };

  // Client Options
  const clientOptions = {
    documentSelector: [{ scheme: "file", language: "urpc" }],
    documentFormattingProvider: true,
  };

  // Create and Start the Client
  client = new LanguageClient(
    "urpcLanguageServer",
    "UFO RPC Language Server",
    serverOptions,
    clientOptions,
  );

  // Start the client.
  console.log(`Starting UFO RPC Language Server: ${serverCommand}`);
  client
    .start()
    .catch((error) => {
      vscode.window.showErrorMessage(
        `Failed to start UFO RPC Language Server: ${error}`,
      );
      console.error("Failed to start the language client:", error);
    });
}

/**
 * Deactivates the extension.
 */
function deactivate() {
  console.log("Deactivating UFO RPC extension.");
  if (!client) return undefined;
  return client.stop();
}

module.exports = {
  activate,
  deactivate,
};
