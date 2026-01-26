// src/extension.ts
import * as vscode from 'vscode';
import { setupStatusBar } from './ui/statusBar';
import { copySelection } from './actions/copy';
import { runInNewTerminal } from './actions/runInTerminal';
import { openLink } from './actions/openLink';

export function activate(context: vscode.ExtensionContext): void {
	console.log('✅ Terminal Tooling extension activated');

	// Setup status bar UI
	setupStatusBar(context);

	// Register commands
	context.subscriptions.push(
		vscode.commands.registerCommand('terminal-tooling.copySelection', copySelection),
		vscode.commands.registerCommand('terminal-tooling.runInNewTerminal', runInNewTerminal),
		vscode.commands.registerCommand('terminal-tooling.openLink', openLink)
	);
}

export function deactivate(): void {
	console.log('Terminal Tooling extension deactivated');
}