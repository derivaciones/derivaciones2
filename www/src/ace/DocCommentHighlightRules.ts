export class DocCommentHighlightRules{

  $rules: any;

  constructor(){
    this.$rules = {
      start : [ {
        token : "comment.doc.annotation",
        regex : "@[\\w\\d_]+" // TODO: fix email addresses
      }, 
      this.getTagRule("comment.doc"),
      {
        defaultToken : "comment.doc",
        caseInsensitive: true
      }]
    };
  }

  getRules(): any {
    return this.$rules;
  }

  getTagRule(prefix: string) {
    return {
      token : (prefix ? prefix + '.' : '') + 'tag',
      regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b\\:?"
    };
  };

  getStartRule(next: string) {
    return {
      token : "comment.doc.start", // doc comment
      regex : "\\/\\*(?=\\*)",
      next  : next
    };
  };

  getEndRule(next: string) {
    return {
      token : "comment.doc.end", // closing comment
      regex : "\\*\\/",
      next  : next
    };
  };

}