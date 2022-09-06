var React = require('react');
var { mount } = require('enzyme');
var ReactQuill = require('../lib/index');

function ReactQuillNode(props, children, strictMode) {
  props = Object.assign(
    {
      modules: { toolbar: ['underline', 'bold', 'italic'] },
      formats: ['underline', 'bold', 'italic'],
    },
    props
  );

  let quillComponent = React.createElement(ReactQuill, props, children);

  return strictMode ?
    React.createElement(React.StrictMode, null, quillComponent) :
    quillComponent;
}

function mountReactQuill(props, node, strictMode) {
  return mount(ReactQuillNode(props, node, strictMode));
}

function getQuillInstance(wrapper) {
  return wrapper.instance().getEditor();
}

function getQuillDOMNode(wrapper) {
  return wrapper.getDOMNode().querySelector('.ql-editor');
}

function getQuillContentsAsHTML(wrapper) {
  return getQuillDOMNode(wrapper).innerHTML;
}

function setQuillContentsFromHTML(wrapper, html) {
  const editor = getQuillInstance(wrapper);
  return editor.clipboard.dangerouslyPasteHTML(html);
}

module.exports = {
  mountReactQuill,
  getQuillInstance,
  getQuillDOMNode,
  getQuillContentsAsHTML,
  setQuillContentsFromHTML,
};
