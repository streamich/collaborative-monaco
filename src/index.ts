import {StrBinding} from 'collaborative-editor';
import {MonacoEditorFacade} from './MonacoEditorFacade';
import type * as monaco from 'monaco-editor';
import type {StrApi} from 'json-joy/es2020/json-crdt';

export const bind = (str: StrApi, editor: monaco.editor.IStandaloneCodeEditor, polling?: boolean): (() => void) => {
  const facade = new MonacoEditorFacade(str, editor);
  const binding = new StrBinding(str, facade);
  binding.syncFromModel();
  binding.bind(polling);
  return binding.unbind;
};
