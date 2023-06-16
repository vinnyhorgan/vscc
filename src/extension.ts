import * as vscode from 'vscode';

interface LuaAPIItem {
  label: string;
  kind: vscode.CompletionItemKind;
  insertText: vscode.SnippetString;
  documentation: vscode.MarkdownString;
}

const graphicsAPI: LuaAPIItem[] = [
  {
    label: 'Image',
    kind: vscode.CompletionItemKind.Class,
    insertText: new vscode.SnippetString('Image'),
    documentation: new vscode.MarkdownString('Represents an image.'),
  },
  {
    label: 'loadTexture',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('loadTexture("$1")'),
    documentation: new vscode.MarkdownString('Loads an image from the specified file path.'),
  },
  {
    label: 'drawTexture',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('drawTexture(${1:image}, ${2:x}, ${3:y})'),
    documentation: new vscode.MarkdownString('Draws the specified image at the specified x and y coordinates.'),
  },
  {
    label: 'FilterMode',
    kind: vscode.CompletionItemKind.Enum,
    insertText: new vscode.SnippetString('FilterMode'),
    documentation: new vscode.MarkdownString('Represents the filter mode used when rendering an image.'),
  },
  {
    label: 'Point',
    kind: vscode.CompletionItemKind.EnumMember,
    insertText: new vscode.SnippetString('Point'),
    documentation: new vscode.MarkdownString('Uses point filtering when rendering an image.'),
  },
  {
    label: 'Bilinear',
    kind: vscode.CompletionItemKind.EnumMember,
    insertText: new vscode.SnippetString('Bilinear'),
    documentation: new vscode.MarkdownString('Uses bilinear filtering when rendering an image.'),
  },
];

const imageAPI: LuaAPIItem[] = [
  {
    label: 'getWidth',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('getWidth()'),
    documentation: new vscode.MarkdownString('Returns the width of the image in pixels.'),
  },
  {
    label: 'getHeight',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('getHeight()'),
    documentation: new vscode.MarkdownString('Returns the height of the image in pixels.'),
  },
  {
    label: 'getFilter',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('getFilter()'),
    documentation: new vscode.MarkdownString('Returns the current filter mode of the image.'),
  },
  {
    label: 'setFilter',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('setFilter(${1:filter})'),
    documentation: new vscode.MarkdownString('Sets the filter mode of the image to the specified value.'),
  },
];

const guiAPI: LuaAPIItem[] = [
  {
    label: 'enableDocking',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('enableDocking()'),
    documentation: new vscode.MarkdownString('Enables docking for the GUI component.'),
  },
  {
    label: 'disableDocking',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('disableDocking()'),
    documentation: new vscode.MarkdownString('Disables docking for the GUI component.'),
  },
  {
    label: 'text',
    kind: vscode.CompletionItemKind.Method,
    insertText: new vscode.SnippetString('text("$1")'),
    documentation: new vscode.MarkdownString('Displays the specified text on the GUI component.'),
  },
];

export function activate(context: vscode.ExtensionContext) {
  const ccApi = vscode.languages.registerCompletionItemProvider('lua', {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
      const linePrefix = document.lineAt(position).text.substr(0, position.character);

      if (linePrefix.endsWith('cc.graphics.')) {
        return graphicsAPI.map((item) => {
          const completionItem = new vscode.CompletionItem(item.label, item.kind);
          completionItem.insertText = item.insertText;
          completionItem.documentation = item.documentation;
          return completionItem;
        });
      }

      if (linePrefix.endsWith('cc.graphics.Image.')) {
        return imageAPI.map((item) => {
          const completionItem = new vscode.CompletionItem(item.label, item.kind);
          completionItem.insertText = item.insertText;
          completionItem.documentation = item.documentation;
         return completionItem;
        });
      }

      if (linePrefix.endsWith('cc.gui.')) {
        return guiAPI.map((item) => {
          const completionItem = new vscode.CompletionItem(item.label, item.kind);
          completionItem.insertText = item.insertText;
          completionItem.documentation = item.documentation;
          return completionItem;
        });
      }

      return undefined;
    },
  }, '.');

  // hover
    const hoverProvider = vscode.languages.registerHoverProvider('lua', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            if (word === 'cc') {
                return new vscode.Hover('Cocos Creator API');

            } else if (word === 'graphics') {
                return new vscode.Hover('Cocos Creator Graphics API');

            } else if (word === 'Image') {
                return new vscode.Hover('Cocos Creator Image API');

            } else if (word === 'gui') {
                return new vscode.Hover('Cocos Creator GUI API');

            } else if (word === 'loadTexture') {
                return new vscode.Hover('Loads an image from the specified file path.');

            } else if (word === 'drawTexture') {
                return new vscode.Hover('Draws the specified image at the specified x and y coordinates.');

            } else if (word === 'FilterMode') {

                return new vscode.Hover('Represents the filter mode used when rendering an image.');

            } else if (word === 'Point') {
                return new vscode.Hover('Uses point filtering when rendering an image.');

            } else if (word === 'Bilinear') {
                return new vscode.Hover('Uses bilinear filtering when rendering an image.');

            } else if (word === 'getWidth') {
                return new vscode.Hover('Returns the width of the image in pixels.');

            } else if (word === 'getHeight') {
                return new vscode.Hover('Returns the height of the image in pixels.');

            } else if (word === 'getFilter') {
                return new vscode.Hover('Returns the current filter mode of the image.');

            } else if (word === 'setFilter') {
                return new vscode.Hover('Sets the filter mode of the image to the specified value.');

            } else if (word === 'enableDocking') {

                return new vscode.Hover('Enables docking for the GUI component.');

            } else if (word === 'disableDocking') {
                return new vscode.Hover('Disables docking for the GUI component.');

            } else if (word === 'text') {
                return new vscode.Hover('Displays the specified text on the GUI component.');

            } else {
                return undefined;

            }

        }
    });





  context.subscriptions.push(ccApi);
    context.subscriptions.push(hoverProvider);
}
