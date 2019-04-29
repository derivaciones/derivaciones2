
const ace = require('ace-builds');

//this module is loaded inside ace script so we must not worry about it in browserify process
const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules

import { DocCommentHighlightRules } from "./DocCommentHighlightRules";

export class DerivacionesHighlightRules extends TextHighlightRules{

  docCommentHighlightRules: DocCommentHighlightRules;

  constructor(){
    super()
    this.docCommentHighlightRules = new DocCommentHighlightRules();
    this.$rules = {
      no_regex: [
        this.docCommentHighlightRules.getStartRule("doc-start"),
        this.comments("no_regex")
      ],
      start: [
        this.docCommentHighlightRules.getStartRule("doc-start"),
        this.comments("start")
      ]
    }
    const embedded = [ this.docCommentHighlightRules.getEndRule("no_regex") ];
    this.embedRules(this.docCommentHighlightRules.getRules(), "doc-", embedded);
    this.normalizeRules();
  }

  comments(next:any) {
    return [{
      token : "comment.start", // multi line comment
      regex : /\/\*/,
      next: [
        this.docCommentHighlightRules.getTagRule("comment"),
      {
        token : "comment.end", 
        regex : "\\*\\/", 
        next : next || "pop"
      },{
        defaultToken : "comment", 
        caseInsensitive: true
      }]
    }, {
      token : "comment",
      regex : "\\/\\/",
      next: [
        this.docCommentHighlightRules.getTagRule("comment"),
      {
        token : "comment", 
        regex : "$|^", 
        next : next || "pop"
      },{
        defaultToken : "comment", 
        caseInsensitive: true
      }]
    }];
  }

}