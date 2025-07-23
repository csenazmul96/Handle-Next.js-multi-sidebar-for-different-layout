import React from 'react';

const EditorStyles = {
    code: 'editor-code',
    heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
    },
    image: 'editor-image',
    link: 'editor-link',
    list: {
        listitem: 'editor-listitem',
        nested: {
            listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
    },
    ltr: 'ltr',
    paragraph: 'editor-paragraph',
    placeholder: 'editor-placeholder',
    quote: 'editor-quote',
    rtl: 'rtl',
    text: {
        bold: 'editor-text-bold',
        code: 'editor-text-code',
        hashtag: 'editor-text-hashtag',
        italic: 'editor-text-italic',
        overflowed: 'editor-text-overflowed',
        strikethrough: 'editor-text-strikethrough',
        underline: 'editor-text-underline',
        underlineStrikethrough: 'editor-text-underlineStrikethrough',
    },
};

const EditorComponent = () => {
    return (
        <div className={EditorStyles.paragraph}>
            <h1 className={EditorStyles.heading.h1}>Heading 1</h1>
            <h2 className={EditorStyles.heading.h2}>Heading 2</h2>
            <p className={EditorStyles.text.bold}>This is a bold text</p>
            <p className={EditorStyles.text.italic}>This is an italic text</p>
            <img className={EditorStyles.image} src="image.jpg" alt="Example" />
            <ul className={EditorStyles.list.ul}>
                <li className={EditorStyles.list.listitem}>Item 1</li>
                <li className={EditorStyles.list.listitem}>Item 2</li>
            </ul>
        </div>
    );
};

export default EditorComponent;
