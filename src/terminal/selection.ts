import * as vscode from 'vscode';

export async function getTerminalSelection(): Promise<string | undefined> {
    if (!vscode.window.activeTerminal) {
        return undefined;
    }

    // Save original clipboard
    const originalClipboard = await vscode.env.clipboard.readText();

    // Copy terminal selection (does nothing if no selection)
    await vscode.commands.executeCommand('workbench.action.terminal.copySelection');

    // Read what was copied
    const copied = await vscode.env.clipboard.readText();

    console.log('Copied from terminal:', copied);

    // Restore original clipboard
    await vscode.env.clipboard.writeText(originalClipboard);

    // Return trimmed text if non-empty
    const trimmed = copied.trim();
    return trimmed ? trimmed : undefined;
}