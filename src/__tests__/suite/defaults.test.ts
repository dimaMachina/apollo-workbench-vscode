import * as assert from 'assert';

import { it, before } from 'mocha';
import { StateManager } from '../../workbench/stateManager';
import { commands } from 'vscode';
import NotLoggedInTreeItem from '../../workbench/tree-data-providers/tree-items/graphos-supergraphs/notLoggedInTreeItem';

suite('Default Workbench Tests', async () => {
  before(async () => {
    await commands.executeCommand('local-supergraph-designs.focus');
  });

  it('Defaults:StudioGraphs - Should display login item', async function () {
    await commands.executeCommand('local-supergraph-designs.focus');
    //Setup
    StateManager.instance.globalState_userApiKey = '';

    //Get TreeView children
    const studioGraphTreeItems =
      await StateManager.instance.apolloStudioGraphsProvider.getChildren();

    //Assert
    studioGraphTreeItems.forEach((studioGraphTreeItem) =>
      assert.notStrictEqual(
        studioGraphTreeItem as NotLoggedInTreeItem,
        undefined,
      ),
    );
  });
  it('Defaults:StudioOperations - Should display login item', async function () {
    //Setup
    StateManager.instance.globalState_userApiKey = '';

    //Get TreeView children
    const studioGraphTreeItems =
      await StateManager.instance.apolloStudioGraphsProvider.getChildren();

    //Assert
    for (let i = 0; i < studioGraphTreeItems.length; i++)
      assert.notStrictEqual(
        studioGraphTreeItems[i] as NotLoggedInTreeItem,
        undefined,
      );
  });
});
