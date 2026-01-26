// src/actions/openLink.ts
import * as vscode from 'vscode';
import { getTerminalSelection } from '../terminal/selection';
import { isUrl, normalizeUrl } from '../utils';

export async function openLink(): Promise<void> {
    const text = await getTerminalSelection();

    if (!text) {
        vscode.window.showWarningMessage('No text selected in terminal.');
        return;
    }

    if (!isUrl(text)) {
        vscode.window.showWarningMessage('Selected text is not a valid URL.');
        return;
    }

    const url = normalizeUrl(text);
    await vscode.env.openExternal(vscode.Uri.parse(url));

    vscode.window.showInformationMessage('✓ Opening in browser');
}