import * as vscode from 'vscode';
import { getTerminalSelection } from '../terminal/selection';
import { sanitizeSelection } from '../utils';

export async function runInNewTerminal() {
    const text = await getTerminalSelection();
    if (!text) {
        vscode.window.showWarningMessage('No text selected in terminal.');
        return;
    }

    const sanitized = sanitizeSelection(text);
    const newTerminal = vscode.window.createTerminal('New Terminal');
    newTerminal.show();
    newTerminal.sendText(sanitized, true); // true adds newline and executes
    vscode.window.showInformationMessage('Running in new terminal!');
}