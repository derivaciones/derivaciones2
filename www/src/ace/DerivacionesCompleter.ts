import { Ace } from 'ace-builds';

type CompletionCallback = (error: any, completions: Ace.Completion[]) => void;

interface CompletionFull{
  $score: number
  caption: string
  exactMatch: number
  matchMask: number
  meta: string
  score: number
  value: string
  docHTML?: string
}

export class DerivacionesCompleter{

  constructor(){

  }

  getCompletions(editor: Ace.Editor, session: Ace.EditSession, pos: Ace.Point, prefix: string, callback: CompletionCallback){
    console.log(prefix)
    callback(null, [{
      name: "algo",
      value: "mi valor",
      score: 5,
      meta: "rhyme2"
    }])
  }
  getDocTooltip(item:CompletionFull) {
    //console.log(item)
    if (item.meta != "local" && !item.docHTML) {
        item.docHTML = [
            "<b>", "</b>", item.meta, "<hr></hr>"
        ].join("");
    }
  }

}