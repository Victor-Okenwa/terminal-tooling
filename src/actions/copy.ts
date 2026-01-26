// src/actions/copy.ts
import * as vscode from 'vscode';
import { getTerminalSelection } from '../terminal/selection';

export async function copySelection(): Promise<void> {
    const text = await getTerminalSelection();

    if (!text) {
        vscode.window.showWarningMessage('No text selected in terminal.');
        return;
    }

    await vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage('✓ Copied to clipboard');
}