import React, { Component } from 'react';
import ace from 'ace-builds';
import { Ace } from 'ace-builds';


import { DerivacionesMode } from '../../ace/DerivacionesMode';
import { DerivacionesCompleter } from '../../ace/DerivacionesCompleter';
import { TokenTooltip } from '../../ace/legacy/TokenToolTip';

const languageTools = require('ace-builds/src-noconflict/ext-language_tools');

//avoid breaking on require 'ace/snippets/text'
require('ace-builds/src-noconflict/snippets/text');

class Editor<P> extends Component<P> {

  derivacionesMode: Ace.SyntaxMode;

  constructor(props: Readonly<P>){
    super(props);
    this.derivacionesMode = (new DerivacionesMode()) as Ace.SyntaxMode;
  }

  container: HTMLDivElement | null = null;
  
  componentDidMount() {
    if(this.container != null){
      console.log("edit")
      const editor = ace.edit(this.container!!, {
        maxLines: 50,
        minLines: 10,
        value: ""+
          "/** TODO: */ " + "\n" +
          "¬r premisa " + "\n"
      })
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
      });
      const session = editor.session;
      session.setMode(this.derivacionesMode);
      session.setUseWorker(false);
      session.on('tokenizerUpdate', function(delta) {
        // session.setAnnotations([{
        //   row: 1,
        //   column: 0,
        //   text: "Error Message", // Or the Json reply from the parser 
        //   type: "error" // also "warning" and "information"
        // }]);
        const result = [];
        const length = session.getLength();
        for (let rowIndex = 0; rowIndex < length; rowIndex++) {
          const elements = session.getTokens(rowIndex);
          result.push(elements);
        }
        console.log(result)
      });
      new TokenTooltip(editor);
      languageTools.addCompleter(new DerivacionesCompleter());
    }
    else{
      console.log("Something went wrong, container is null")
    }
  }

  componentWillUnmount() {


  }
  
  render() {
    return (
      <div className="Editor">
        <span>Editor</span>
        <div ref={container => this.container = container}></div>
      </div>
    );
  }
}

export default Editor;