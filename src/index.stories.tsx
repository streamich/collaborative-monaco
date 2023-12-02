import * as React from 'react';
import {Model} from 'json-joy/es2020/json-crdt';
import type {Meta, StoryObj} from '@storybook/react';
import * as monaco from 'monaco-editor';
import {bind} from '.';

interface EditorProps {
  src: string;
}

const Editor: React.FC<EditorProps> = ({src = ''}) => {
	const divEl = React.useRef<HTMLDivElement>(null);
  const [model, clone] = React.useMemo(() => {
    const model = Model.withLogicalClock();
    model.api.root({text: src});
    return [model, model.clone()];
  }, []);
	React.useEffect(() => {
		if (!divEl.current) return;
    const editor = monaco.editor.create(divEl.current, {});
    const unbind = bind(model.api.str(['text']), editor, true);
		return () => {
			unbind();
		};
	}, [model]);
  React.useSyncExternalStore(model.api.subscribe, () => model.tick);

  return (
    <div>
      <div className="Editor" ref={divEl} style={{width: 800, height: 250, border: '1px solid #ddd'}} />
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
