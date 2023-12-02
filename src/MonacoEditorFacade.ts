import type {SimpleChange, EditorFacade, Selection} from 'collaborative-editor';
import type {StrApi} from 'json-joy/es2020/json-crdt';
import type * as monaco from 'monaco-editor';

// API:
// model.getOffsetAt(pos)
// model.getPositionAt(offset)
// model.applyEdits([{ range, text: insert }])
// model..onDidChangeContent(listener)
// model.onWillDispose(listener)
// editor.getSelection()
// editor.onDidChangeCursorSelection(listener)
// editor.getModel()
// editor.setSelection(selection)
// editor.deltaDecorations(oldDecorations, newDecorations)
export class MonacoEditorFacade implements EditorFacade {
  public selection!: Selection;
  public onchange?: (changes: SimpleChange[] | void) => void;
  public onselection?: () => void;

  private readonly modelChangeDisposable: monaco.IDisposable;

  constructor(
    protected readonly str: StrApi,
    protected readonly editor: monaco.editor.IStandaloneCodeEditor,
  ) {
    this.modelChangeDisposable = editor.onDidChangeModelContent((event) => {
      const rawChanges = event.changes.sort(({rangeOffset: offset1}, {rangeOffset: offset2}) => offset2 - offset1);
      const changes: SimpleChange[] = [];
      const length = rawChanges.length;
      for (let i = 0; i < length; i++) {
        const {rangeOffset, rangeLength, text} = rawChanges[i];
        changes.push([rangeOffset, rangeLength, text]);
      }
      console.log(changes);
      this.onchange?.(changes);
    });
  }

  public get(): string {
    return this.editor.getValue();
  }

  public getLength(): number {
    return this.editor.getModel()!.getValueLength();
  }

  public set(text: string): void {
    this.editor.setValue(text);
  }

  public getSelection(): [number, number, -1 | 0 | 1] | null {
    console.log('getSelection');
    return null;
  }

  public setSelection(start: number, end: number, direction: -1 | 0 | 1): void {

  }

  protected createChange(event: InputEvent): SimpleChange | undefined {
    return undefined;
  }

  public dispose(): void {
    this.modelChangeDisposable.dispose();
  }
}
