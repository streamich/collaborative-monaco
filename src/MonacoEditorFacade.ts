import type {SimpleChange, EditorFacade, Selection} from 'collaborative-editor';
import type {StrApi} from 'json-joy/es2020/json-crdt';

// API:
// model.getOffsetAt(pos)
// model.getPositionAt(offset)
// model.applyEdits([{ range, text: insert }])
// model.getValue()
// model.setValue(text)
// model..onDidChangeContent(listener)
// model.onWillDispose(listener)
// editor.getSelection()
// editor.onDidChangeCursorSelection(listener)
// editor.getMode()
// editor.setSelection(selection)
// editor.deltaDecorations(oldDecorations, newDecorations)

export class MonacoEditorFacade implements EditorFacade {
  public selection!: Selection;
  public onchange?: (change: SimpleChange | void) => void;
  public onselection?: () => void;

  constructor(
    protected readonly str: StrApi,
    protected readonly input: HTMLInputElement | HTMLTextAreaElement,
  ) {
    throw new Error('Not implemented');
  }

  public get(): string {
    throw new Error('Not implemented');
  }

  public getLength(): number {
    throw new Error('Not implemented');
  }

  public set(text: string): void {
    throw new Error('Not implemented');
  }

  public getSelection(): [number, number, -1 | 0 | 1] | null {
    throw new Error('Not implemented');
  }

  public setSelection(start: number, end: number, direction: -1 | 0 | 1): void {
    throw new Error('Not implemented');
  }

  protected createChange(event: InputEvent): SimpleChange | undefined {
    throw new Error('Not implemented');
  }

  public dispose(): void {
    throw new Error('Not implemented');
  }
}
