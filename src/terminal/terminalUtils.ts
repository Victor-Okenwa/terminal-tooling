// src/terminal/terminalUtils.ts
import * as vscode from 'vscode';

/**
 * Checks if a terminal is currently focused
 */
export function isTerminalFocused(): boolean {
    // When terminal is focused, there's no active text editor
    return !vscode.window.activeTextEditor && !!vscode.window.activeTerminal;
}

/**
 * Gets the active terminal
 */
export function getActiveTerminal(): vscode.Terminal | undefined {
    return vscode.window.activeTerminal;
}