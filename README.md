# Collaborative editing for Monaco editor

Makes a plain Monaco editor instance collaborative by binding it to a JSON CRDT
document `str` node. This allows multiple users to edit the same document
json-joy JSON CRDT document concurrently through the Monaco editor.


## Usage

Installation:

```
npm install json-joy monaco-editor collaborative-monaco
```

Usage:

```ts
import {bind} from 'collaborative-monaco';
import * as monaco from 'monaco-editor';
import {Model} from 'json-joy/es2020/json-crdt';

const model = Model.withLogicalClock();
model.api.root({text: ''});
const str = model.api.str(['text']);

const editor = monaco.editor.create(div, {
  value: 'hello world',
});

const unbind = bind(str, editor);

// When done, unbind the binding.
binding.unbind();
```


## Preview

- See [demo](https://streamich.github.io/collaborative-monaco).
