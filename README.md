# UFO RPC VSCode Extension

Official UFO RPC extension for Visual Studio Code or any VSCode based editor.

- [UFO RPC Repository](https://github.com/uforg/uforpc)
- [UFO RPC VSCode Extension Repository](https://github.com/uforg/uforpc-vscode)

## Features

The following features are provided by the extension for `.urpc` files.

- Syntax highlighting
- Error highlighting
- Code autocompletion
- Auto formatting

## Requirements

This extension requires the UFO RPC (`urpc`) binary on your operating system
PATH.

You can download the binary for any OS/Arch in the
[UFO RPC Releases page.](https://github.com/uforg/uforpc/releases)

For more information on how to install `urpc`, read the
[UFO RPC documentation.](https://github.com/uforg/uforpc)

If the binary is not in your operating system PATH, you can set a custom path in
the `urpc.binaryPath` setting.

## Extension Settings

- `urpc.enable`: Enable UFO RPC language support. If disabled, the only feature
  that will be available is Syntax Highlighting. Default `true`.

- `urpc.binaryPath`: Path to the UFO RPC binary. If not set, the extension will
  try to find `urpc` or `urpc.exe` in your PATH. Default `<not set>`.

## Commands

- `urpc.init`: Initialize a new `schema.urpc` file
- `urpc.restart`: Restart Language Server

## Release Notes

### 0.1.1

Downgrade minimum VSCode version to 1.96.0.

### 0.1.0

Initial release of UFO RPC for VSCode.
