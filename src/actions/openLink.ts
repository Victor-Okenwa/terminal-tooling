import * as vscode from 'vscode';
import { getTerminalSelection } from '../terminal/selection';
import { isUrl } from '../utils';
import { sanitizeSelection } from '../utils';

export async function openLink() {
    const text = await getTerminalSelection();
    if (!text) {
        vscode.window.showWarningMessage('No text selected in terminal.');
        return;
    }
    const sanitized = sanitizeSelection(text);
    if (!isUrl(sanitized)) {
        vscode.window.showWarningMessage('Selected text does not look like a URL.');
        return;
    }
    await vscode.env.openExternal(vscode.Uri.parse(sanitized));
    vscode.window.showInformationMessage('Opening in browser!');
}