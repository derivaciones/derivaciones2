import { Ace } from 'ace-builds';
import { DerivacionesHighlightRules } from './DerivacionesHighlightRules';

import ace from 'ace-builds';

const aceAny = ace as any;

// avoid error on request ace/snippets/derivaciones script
// when client sets 'enableSnippets: true'

aceAny.define("ace/snippets/derivaciones",["exports"], function(exports: any) {
  "use strict";
  exports.snippetText = undefined;
  exports.scope = "derivaciones";
});

//this module is loaded inside ace script so we must not worry about it in browserify process
const TextMode = ace.require('ace/mode/text').Mode

export class DerivacionesMode extends TextMode /* implements Ace.SyntaxMode*/{

  constructor(){
    super()
    this.$id = "ace/mode/derivaciones"
    this.HighlightRules = DerivacionesHighlightRules
  }

}