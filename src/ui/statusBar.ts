import * as vscode from 'vscode';
import { isTerminalEditor } from '../terminal/terminalUtils';
import { getTerminalSelection } from '../terminal/selection';

export function setupStatusBar(context: vscode.ExtensionContext) {
    // Create items (right-aligned, priorities to group them)
    const copyItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    copyItem.text = '$(clipboard) Copy';
    copyItem.tooltip = 'Copy selected terminal text';
    copyItem.command = 'terminal-tooling.copySelection';

    const runItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
    runItem.text = '$(terminal) Run';
    runItem.tooltip = 'Run selected text in new terminal';
    runItem.command = 'terminal-tooling.runInNewTerminal';

    const openItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 98);
    openItem.text = '$(globe) Open';
    openItem.tooltip = 'Open selected URL in browser';
    openItem.command = 'terminal-tooling.openLink';

    context.subscriptions.push(copyItem, runItem, openItem);

    let interval: NodeJS.Timeout | undefined;

    // Listen for editor changes
    const editorChangeDisposable = vscode.window.onDidChangeActiveTextEditor(editor => {
        if (isTerminalEditor(editor)) {
            // Start polling for selection
            if (interval) { clearInterval(interval); }
            interval = setInterval(async () => {
                const text = await getTerminalSelection();
                if (text) {
                    copyItem.show();
                    runItem.show();
                    openItem.show();
                } else {
                    copyItem.hide();
                    runItem.hide();
                    openItem.hide();
                }
            }, 200); // Poll every 200ms
        } else {
            // Stop polling and hide
            if (interval) { clearInterval(interval); }
            interval = undefined;
            copyItem.hide();
            runItem.hide();
            openItem.hide();
        }
    });
    context.subscriptions.push(editorChangeDisposable);
}