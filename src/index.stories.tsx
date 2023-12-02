import * as React from 'react';
import {Model} from 'json-joy/es2020/json-crdt';
import type {Meta, StoryObj} from '@storybook/react';
import * as monaco from 'monaco-editor';

interface EditorProps {
  src: string;
}

const Editor: React.FC<EditorProps> = ({src}) => {
	const divEl = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if (!divEl.current) return;
    const editor = monaco.editor.create(divEl.current, {
      value: src,
    });

    const disposable = editor.onDidChangeModelContent((e) => {
      console.log(e, editor.getValue(), editor.getSelection());
    });
		return () => {
			editor.dispose();
      disposable.dispose();
		};
	}, []);
	return <div className="Editor" ref={divEl} style={{width: 800, height: 250, border: '1px solid #ddd'}} />;
};

const Demo: React.FC = () => {
  return (
    <div>
      <Editor src={'hello world'} />
    </div>
  );
};

const meta: Meta<typeof Text> = {
  title: 'Monaco Editor',
  component: Demo as any,
  argTypes: {},
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
