const path = require("path");
const vscode = require("vscode");
const execProcess = require("child_process").exec;
const getBinaryPath = require("./getBinaryPath.js");
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

  context.subscriptions.push(
    vscode.commands.registerCommand("urpc.init", async function () {
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

        vscode.window.showInformationMessage(
          `Schema initialized at ${schemaPath}`,
        );
      });
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("urpc.restart", function () {
      restartLanguageServer(binaryPath);
    }),
  );
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
