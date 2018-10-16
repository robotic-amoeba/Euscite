import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'



class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {
      this.setState({ editorState });
      this.submitText()
    }
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
          
          submitText = () => {
            this.props.saveText(stateToHTML(this.state.editorState.getCurrentContent()),this.props.id)
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

          <div className="buttons-wrapper">
            <button onClick={this._textBold.bind(this)}><b>Bold</b></button>
            <button onClick={this._textItalic.bind(this)}><i>Italic</i></button>
            <button onClick={this._textUnderlined.bind(this)}><u>Underline</u></button>
            <button onClick={this._textCode.bind(this)}><code>Code</code></button>
          </div>
        </div>
      );
    }
  }

export default TextEditor;