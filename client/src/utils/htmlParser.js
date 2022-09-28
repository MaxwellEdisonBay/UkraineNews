var protos = document.body.constructor === window.HTMLBodyElement;
var validHTMLTags =
  /^(?:abbr|acronym|address|applet|area|article|aside|audio|base|basefont|bdi|bdo|bgsound|big|blink|blockquote|body|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|iframe|img|input|ins|isindex|kbd|keygen|label|legend|li|link|listing|main|map|mark|marquee|menu|menuitem|meta|meter|nav|nobr|noframes|noscript|object|ol|optgroup|option|output|param|plaintext|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|spacer|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr|xmp)$/i;

export function sanitize(txt) {
  if (txt === null) {return null}
  var // This regex normalises anything between quotes
    normaliseQuotes = /=(["'])(?=[^\1]*[<>])[^\1]*\1/g,
    normaliseFn = function ($0, q, sym) {
      return $0.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    replaceInvalid = function ($0, tag, off, txt) {
      var // Is it a valid tag?
        invalidTag =
          (protos &&
            document.createElement(tag) instanceof HTMLUnknownElement) ||
          !validHTMLTags.test(tag),
        // Is the tag complete?
        isComplete = txt.slice(off + 1).search(/^[^<]+>/) > -1;

      return invalidTag || !isComplete ? "&lt;" + tag : $0;
    };

  txt = txt
    .replace(normaliseQuotes, normaliseFn)
    .replace(/<(\w+)/g, replaceInvalid);

  var tmp = document.createElement("DIV");
  tmp.innerHTML = txt;

  return "textContent" in tmp ? tmp.textContent : tmp.innerHTML;
}
