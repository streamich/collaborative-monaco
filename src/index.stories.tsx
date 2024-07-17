import * as React from 'react';
import {Model, s} from 'json-joy/lib/json-crdt';
import type {Meta, StoryObj} from '@storybook/react';
import * as monaco from 'monaco-editor';
import {bind} from '.';

interface EditorProps {
  src: string;
}

const Editor: React.FC<EditorProps> = ({src = ''}) => {
  const divEl = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const [model, clone] = React.useMemo(() => {
    const model = Model.create(s.str(src));
    return [model, model.clone()];
  }, []);
  React.useEffect(() => {
    if (!divEl.current) return;
    const editor = ((editorRef as any).current = monaco.editor.create(divEl.current, {}));
    const unbind = bind(model.s.toApi(), editor, true);
    return () => {
      unbind();
    };
  }, [model]);
  React.useSyncExternalStore(model.api.subscribe, () => model.tick);

  const insert = (text: string, position?: number) => {
    const editor = editorRef.current;
    if (!editor) return;
    const editorModel = editor.getModel();
    if (!editorModel) return;
    const value = editorModel.getValue();
    const start = editorModel.getPositionAt(position ?? value.length);
    const end = length ? editorModel.getPositionAt(position ?? value.length) : start;
    const range = new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column);
    editorModel.applyEdits([{range, text}]);
  };

  return (
    <div>
      <div className="Editor" ref={divEl} style={{width: 800, height: 250, border: '1px solid #ddd'}} />
      <div>
        <button onClick={() => insert('!')}>Append "!" to editor</button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              insert('?');
            }, 2000);
          }}
        >
          Append "?" to editor after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              const str = model.s.toApi()
              str.ins(str.length(), '?');
            }, 2000);
          }}
        >
          Append "?" to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              insert('1. ', 0);
            }, 2000);
          }}
        >
          Prepend "1. " to editor after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              const str = model.s.toApi()
              str.ins(0, '1. ');
            }, 2000);
          }}
        >
          Prepend "1. " to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              model.reset(clone);
            }, 2000);
          }}
        >
          RESET after 2s
        </button>
      </div>
      <pre style={{fontSize: '10px'}}>
        <code>{model.root + ''}</code>
      </pre>
    </div>
  );
};

const meta: Meta<EditorProps> = {
  title: 'Monaco Editor',
  component: Editor as any,
  argTypes: {},
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    src: 'gl',
  },
};
