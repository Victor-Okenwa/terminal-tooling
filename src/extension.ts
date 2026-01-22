// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('✅ Terminal Tools and Actions is now active');

	// We'll register our commands here soon
	context.subscriptions.push(
		vscode.commands.registerCommand('terminal-tooling.copySelection', () => {
			vscode.window.showInformationMessage('Copy Selection command triggered');
		}),
		vscode.commands.registerCommand('terminal-tooling.openLink', () => {
			vscode.window.showInformationMessage('Open Link command triggered');
		}),
		vscode.commands.registerCommand('terminal-tooling.runInNewTerminal', () => {
			vscode.window.showInformationMessage('Run in New Terminal command triggered');
		})
	);

}

// This method is called when your extension is deactivated
export function deactivate() {}
