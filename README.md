# UFO RPC VSCode Extension

Official UFO RPC extension for Visual Studio Code or any VSCode based editor.

- [UFO RPC Repository](https://github.com/uforg/uforpc)
- [UFO RPC VSCode Extension Repository](https://github.com/uforg/uforpc-vscode)

## Installation

- [Install from the VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=uforg.urpc)
- [Install from Open VSX Registry](https://open-vsx.org/extension/uforg/urpc)
- [Download the `.vsix` file from the releases page](https://github.com/uforg/uforpc-vscode/releases)

## Features

The following features are provided by the extension for `.urpc` files.

- Syntax highlighting
- Error highlighting
- Code autocompletion
- Auto formatting
- Code snippets

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

## Snippets

The following snippets are available for `.urpc` files:

- `rule`: Creates a new rule template (`rule @$name { }`)
- `type`: Creates a new type template (`type $name { }`)
- `proc`: Creates a new procedure template (`proc $name { }`)

## Release Notes

### 0.1.8

Update extension icon.

### 0.1.7

Refactor `urpc.init` command to initialize a new UFO RPC project instead of a
single `schema.urpc` file.

### 0.1.6

Add `stream` keyword to URPC syntax.

### 0.1.5

Add `bool` type to URPC syntax.

### 0.1.4

Add `deprecated` keyword to URPC syntax.

### 0.1.3

Add code snippets for rule, proc, and type in .urpc files.

### 0.1.2

Add categories for Linters and Formatters in the marketplace and support for
surrounding comments in language configuration.

### 0.1.1

Downgrade minimum VSCode version to 1.96.0.

### 0.1.0

Initial release of UFO RPC for VSCode.
