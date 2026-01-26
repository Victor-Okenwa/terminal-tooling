import * as vscode from 'vscode';

export function isTerminalEditor(editor: vscode.TextEditor | undefined): boolean {
    return !!editor && editor.document.uri.scheme === 'terminal';
}