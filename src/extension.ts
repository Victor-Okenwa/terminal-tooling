import * as vscode from 'vscode';
import { setupStatusBar } from './ui/statusBar';
import { copySelection } from './actions/copy';
import { runInNewTerminal } from './actions/runInTerminal';
import { openLink } from './actions/openLink';

export function activate(context: vscode.ExtensionContext) {
	console.log('✅ Terminal Tools and Actions is now active');

	// Setup UI
	setupStatusBar(context);

	// Register commands (call the action functions)
	context.subscriptions.push(
		vscode.commands.registerCommand('terminal-tooling.copySelection', copySelection),
		vscode.commands.registerCommand('terminal-tooling.runInNewTerminal', runInNewTerminal),
		vscode.commands.registerCommand('terminal-tooling.openLink', openLink)
	);
}

export function deactivate() { }