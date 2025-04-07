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

  // urpc.initialize should call the binary with the "init" command
  // followed by the workspace root path and schema.urpc -> "urpc.exe init <workspace_root>/schema.urpc"
  vscode.commands.registerCommand("urpc.initialize", function () {});

  // Should stop and restart the language server
  // urpc.restart should call the binary with the "lsp" command -> "urpc.exe lsp"
  vscode.commands.registerCommand("urpc.restart", function () {});

  const serverCommand = `${binaryPath} lsp`;
  console.log(`UFO RPC: Server command: ${serverCommand}`);

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
