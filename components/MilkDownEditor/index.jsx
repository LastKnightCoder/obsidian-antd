import * as React from 'react';
import { Editor, rootCtx, defaultValueCtx, editorCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { ReactEditor, useEditor } from '@milkdown/react';
import { commonmark } from '@milkdown/preset-commonmark';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { replaceAll, forceUpdate } from '@milkdown/utils';


const MilkdownEditor = (props) => {
    const { editor } = useEditor((root) =>
        Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, props.content);
                ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
                    props.onUpdate(markdown);
                });
            })
            .use(nord)
            .use(commonmark)
            .use(listener),
    );

    return <ReactEditor editor={editor} />;
};

export default MilkdownEditor;