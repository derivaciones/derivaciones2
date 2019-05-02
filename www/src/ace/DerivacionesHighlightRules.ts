
const ace = require('ace-builds');

//this module is loaded inside ace script so we must not worry about it in browserify process
const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules

import { DocCommentHighlightRules } from "./DocCommentHighlightRules";

export class DerivacionesHighlightRules extends TextHighlightRules{

  docCommentHighlightRules: DocCommentHighlightRules;

  constructor(){
    super()
    this.docCommentHighlightRules = new DocCommentHighlightRules();
    const expression = this.expression("expressionEnd");
    this.$rules = {
      noRegex: [
        this.docCommentHighlightRules.getStartRule("docNoRegex"),
        this.comments("noRegex")
      ],
      start: [
        this.docCommentHighlightRules.getStartRule("docStart"),
        this.comments("start"),
        this.emptyLine(),
        expression
      ],
      expression: expression,
      expressionEnd: [{
        token: "keyword.premise",
        regex: /\bpremisa\b/,
        next: "start"
      },{
        token: "keyword.supose",
        regex: /\bsupuesto\b/,
        next: "start"
      },{
        token: "support.type",
        regex: /\∧/,
        next: "expression"
      }],
      docStart: this.docComment("start"),
      docNoRegex: this.docComment("noRegex")
    }
    // const embedded = [ this.docCommentHighlightRules.getEndRule("start") ];
    // this.embedRules(this.docCommentHighlightRules.getRules(), "doc", embedded);
    this.normalizeRules();
    console.log(this.$rules)
  }

  private docComment(next: string) {
    return [{
      token: "comment.doc.annotation",
      regex: "@[\\w\\d_]+" // TODO: fix email addresses
    },
    this.docCommentHighlightRules.getTagRule("comment.doc"),
    this.docCommentHighlightRules.getEndRule(next),
    {
      defaultToken: "comment.doc",
      caseInsensitive: true
    }];
  }

  private expression(next: string) {
    return [{
      token: "entity.name.expression.atom",
      regex: /\b[a-uw-z]([0-9]*)\b/,
      next: next
    },{
      token: "constant.expression.contradiction",
      regex: /\⊥(?=\s)/,
      next: next
    },{
      token: "support.type.expression.negation",
      regex: /\¬+(?!\¬)/
    }];
  }

  private emptyLine() {
    return {
      token: 'empty_line',
      regex: /^\s*$/,
      next: 'start',
    };
  }

  private comments(next: string) {
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