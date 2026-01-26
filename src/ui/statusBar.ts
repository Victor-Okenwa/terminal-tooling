// src/ui/statusBar.ts
import * as vscode from 'vscode';
import { hasTerminalSelection } from '../terminal/selection';
import { isTerminalFocused } from '../terminal/terminalUtils';

interface StatusBarItems {
    copy: vscode.StatusBarItem;
    run: vscode.StatusBarItem;
    open: vscode.StatusBarItem;
}

export function setupStatusBar(context: vscode.ExtensionContext): void {
    const items = createStatusBarItems();

    // Add all items to subscriptions for cleanup
    Object.values(items).forEach(item => context.subscriptions.push(item));

    // Set up polling mechanism
    const poller = new SelectionPoller(items);
    context.subscriptions.push(poller);

    // Start polling if terminal is already focused
    if (isTerminalFocused()) {
        poller.start();
    }
}

function createStatusBarItems(): StatusBarItems {
    const copyItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    copyItem.text = '$(copy) Copy';
    copyItem.tooltip = 'Copy selected terminal text';
    copyItem.command = 'terminal-tooling.copySelection';

    const runItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        99
    );
    runItem.text = '$(terminal) Run';
    runItem.tooltip = 'Run selected text in new terminal';
    runItem.command = 'terminal-tooling.runInNewTerminal';

    const openItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        98
    );
    openItem.text = '$(link-external) Open';
    openItem.tooltip = 'Open selected URL in browser';
    openItem.command = 'terminal-tooling.openLink';

    return { copy: copyItem, run: runItem, open: openItem };
}

class SelectionPoller implements vscode.Disposable {
    private interval?: NodeJS.Timeout;
    private readonly pollIntervalMs = 300; // Poll every 300ms
    private disposables: vscode.Disposable[] = [];
    private isPolling = false;

    constructor(private items: StatusBarItems) {
        // Listen for terminal focus changes
        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(() => this.handleFocusChange()),
            vscode.window.onDidChangeTerminalState(() => this.handleFocusChange()),
            vscode.window.onDidCloseTerminal(() => this.handleTerminalClose())
        );
    }

    private handleFocusChange(): void {
        if (isTerminalFocused()) {
            this.start();
        } else {
            this.stop();
            this.hideAllItems();
        }
    }

    private handleTerminalClose(): void {
        if (!vscode.window.activeTerminal) {
            this.stop();
            this.hideAllItems();
        }
    }

    start(): void {
        if (this.isPolling) {
            return;
        }

        this.isPolling = true;
        this.interval = setInterval(() => this.poll(), this.pollIntervalMs);
    }

    stop(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
        this.isPolling = false;
    }

    private async poll(): Promise<void> {
        try {
            const hasSelection = await hasTerminalSelection();

            if (hasSelection) {
                this.showAllItems();
            } else {
                this.hideAllItems();
            }
        } catch (error) {
            console.error('Error polling terminal selection:', error);
        }
    }

    private showAllItems(): void {
        Object.values(this.items).forEach(item => item.show());
    }

    private hideAllItems(): void {
        Object.values(this.items).forEach(item => item.hide());
    }

    dispose(): void {
        this.stop();
        this.disposables.forEach(d => d.dispose());
    }
}