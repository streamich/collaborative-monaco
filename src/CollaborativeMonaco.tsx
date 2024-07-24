import * as React from 'react';
import * as monaco from 'monaco-editor';
import useIsomorphicLayoutEffect from 'react-use/lib/useIsomorphicLayoutEffect';
import {bind} from '.';
import type {CollaborativeStr} from 'collaborative-editor';

export interface CollaborativeMonacoProps extends React.HTMLAttributes<HTMLDivElement> {
  str: () => CollaborativeStr;
  editor?: monaco.editor.IStandaloneCodeEditor;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  override?: monaco.editor.IEditorOverrideServices;
  onEditor?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export const CollaborativeMonaco: React.FC<CollaborativeMonacoProps> = ({
  str,
  editor: _editor,
  options,
  override,
  onEditor,
  ...rest
}) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>(null);

  useIsomorphicLayoutEffect(() => {
    if (!divRef.current) return;
    const editor =
      _editor ??
      monaco.editor.create(
        divRef.current,
        options ?? {
          value: str().view(),
          language: 'javascript',
        },
        override,
      );
    if (onEditor) onEditor(editor);
    (editorRef as any).current = editor;
    const unbind = bind(str, editor, true);
    return () => {
      unbind();
      editor.dispose();
    };
  }, [str().api, _editor]);

  return <div {...rest} ref={divRef} />;
};
