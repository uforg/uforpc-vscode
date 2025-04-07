const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

/**
 * This function is used to get the binary path of the UFO RPC binary.
 * It checks the following locations in order:
 *
 * 1. The configuration `urpc.binaryPath`
 * 2. The GOBIN environment variable
 * 3. The system PATH
 *
 * The binary to find is `urpc` or `urpc.exe`.
 *
 * If the binary path is not found in any of these locations, it throws an error.
 *
 * @returns {string} The binary path of the UFO RPC binary.
 * @throws {Error} If the binary path is not found in any of the locations.
 */
function getBinaryPath() {
  // 1. Try to get the binary path from the configuration "urpc.binaryPath"
  //    and if found, early return it
  const config = vscode.workspace.getConfiguration("urpc");
  const configBinaryPath = config.get("binaryPath");

  if (configBinaryPath && fs.existsSync(configBinaryPath)) {
    return configBinaryPath;
  }

  const isWindows = process.platform === "win32";
  const binaryName = isWindows ? "urpc.exe" : "urpc";

  // 2. Try to get the binary path from the GOBIN environment variable
  //    and if found, early return it
  const gobinPath = process.env.GOBIN;
  if (gobinPath) {
    const binaryPath = path.join(gobinPath, binaryName);
    if (fs.existsSync(binaryPath)) {
      return binaryPath;
    }
  }

  // 3. Try to get the binary path from the system PATH
  //    and if found, early return it
  try {
    const command = isWindows ? "where urpc" : "which urpc";
    const binaryPath = execSync(command, { encoding: "utf8" }).trim();

    if (binaryPath && fs.existsSync(binaryPath)) {
      return binaryPath;
    }
  } catch {}

  // If not found, throw an error
  throw new Error(
    "Could not find the UFO RPC binary. Please install it and make sure it's in your PATH, " +
      "or set the binary path in the 'urpc.binaryPath' setting.",
  );
}

module.exports = getBinaryPath;
