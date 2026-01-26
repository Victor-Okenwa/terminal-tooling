// src/terminal/selection.ts
import * as vscode from 'vscode';

/**
 * Gets the current terminal selection without affecting clipboard
 * Returns undefined if no selection or terminal not active
 */
export async function getTerminalSelection(): Promise<string | undefined> {
    const terminal = vscode.window.activeTerminal;
    if (!terminal) {
        return undefined;
    }

    // Store original clipboard content
    const originalClipboard = await vscode.env.clipboard.readText();

    try {
        // Attempt to copy terminal selection
        await vscode.commands.executeCommand('workbench.action.terminal.copySelection');

        // Small delay to ensure clipboard is updated
        await new Promise(resolve => setTimeout(resolve, 10));

        // Read copied content
        const copied = await vscode.env.clipboard.readText();

        // If clipboard didn't change, there was no selection
        if (copied === originalClipboard) {
            return undefined;
        }

        return copied.trim() || undefined;
    } finally {
        // Always restore original clipboard
        await vscode.env.clipboard.writeText(originalClipboard);
    }
}

/**
 * Checks if there's an active terminal selection without reading it
 * More efficient for polling scenarios
 */
export async function hasTerminalSelection(): Promise<boolean> {
    if (!vscode.window.activeTerminal) {
        return false;
    }

    const selection = await getTerminalSelection();
    return !!selection;
}