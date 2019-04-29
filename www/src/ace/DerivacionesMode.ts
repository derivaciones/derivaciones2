import { Ace } from 'ace-builds';
import { DerivacionesHighlightRules } from './DerivacionesHighlightRules';

import ace from 'ace-builds';

//this module is loaded inside ace script so we must not worry about it in browserify process
const TextMode = ace.require('ace/mode/text').Mode

export class DerivacionesMode extends TextMode /* implements Ace.SyntaxMode*/{

  constructor(){
    super()
    this.HighlightRules = DerivacionesHighlightRules
    // const derivacionesHighlightRules = new DerivacionesHighlightRules();
    // this.$rules = derivacionesHighlightRules.getRules();
    // console.log(this.$rules);
  }

}