import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'



class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    console.log("hola")
  }

  
  _textBold() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
      ));
    }
    _textItalic() {
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        'ITALIC'
        ));
      }
      _textUnderlined() {
        this.onChange(RichUtils.toggleInlineStyle(
          this.state.editorState,
          'UNDERLINE'
          ));
        }
        _textCode() {
          this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'CODE'
            ));
          }
          
          submitText() {
            console.log(stateToHTML(this.state.editorState));
          }

    render() {
      return (
        <div className="editor-wrapper">
          <div className="editor">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>

          <div class="buttons-wrapper">
            <button onClick={this._textBold.bind(this)}>Bold</button>
            <button onClick={this._textItalic.bind(this)}>Italic</button>
            <button onClick={this._textUnderlined.bind(this)}>Underline</button>
            <button onClick={this._textCode.bind(this)}>Code</button>
          </div>
          <button onClick={this.submitText.bind(this)}>Submit</button>
        </div>
      );
    }
  }

export default TextEditor;