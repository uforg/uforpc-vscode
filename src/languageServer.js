const { LanguageClient, TransportKind } = require("vscode-languageclient/node");

/**
 * The language server client instance.
 * @type {LanguageClient}
 */
let client;

/**
 * Starts the language server
 * @param {string} binaryPath The path to the binary
 */
async function startLanguageServer(binaryPath) {
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

  console.log(`UFO RPC: Starting Language Server: ${serverCommand}`);
  try {
    await client.start();
    console.log("UFO RPC: Language Server started.");
  } catch (error) {
    console.error("UFO RPC: Failed to start the language server:", error);
    vscode.window.showErrorMessage(
      `UFO RPC: Failed to start Language Server: ${error}`,
    );
  }
}

/**
 * Stops the language server
 */
async function stopLanguageServer() {
  if (!client) {
    console.log("UFO RPC: No Language Server running.");
    return;
  }

  console.log("UFO RPC: Stopping Language Server...");
  try {
    await client.stop();
    console.log("UFO RPC: Language Server stopped.");
  } catch (error) {
    console.error("UFO RPC: Failed to stop the language server:", error);
  }
}

/**
 * Restarts the language server
 * @param {string} binaryPath The path to the binary
 */
async function restartLanguageServer(binaryPath) {
  console.log("UFO RPC: Restarting language server...");
  await stopLanguageServer();
  await startLanguageServer(binaryPath);
  vscode.window.showInformationMessage("UFO RPC: Language Server restarted");
}

module.exports = {
  startLanguageServer,
  stopLanguageServer,
  restartLanguageServer,
};
