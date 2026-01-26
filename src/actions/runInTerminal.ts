// src/actions/runInTerminal.ts
import * as vscode from 'vscode';
import { getTerminalSelection } from '../terminal/selection';
import { sanitizeCommand } from '../utils';

export async function runInNewTerminal(): Promise<void> {
    const text = await getTerminalSelection();

    if (!text) {
        vscode.window.showWarningMessage('No text selected in terminal.');
        return;
    }

    const command = sanitizeCommand(text);
    const terminal = vscode.window.createTerminal('Quick Run');

    terminal.show();
    terminal.sendText(command, true);

    vscode.window.showInformationMessage(`✓ Running: ${command.substring(0, 30)}...`);
}