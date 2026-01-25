import * as vscode from "vscode";

/**
 * Returns the currently selected text in the active editor.
 * Returns null if there is no active editor or no selection.
 */
export function getSelectedText(): string | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return null; }

    const selection = editor.selection;
    if (selection.isEmpty) { return null; }

    const text = editor.document.getText(selection).trim();
    return text.length > 0 ? text : null;
}
