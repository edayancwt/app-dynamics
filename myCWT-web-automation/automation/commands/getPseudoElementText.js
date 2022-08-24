/**
 * @param { CSS selector for example: '[id*="loader"]' } cssSelector
 * @param { callback to for getting the content text of pseudo element } cb
 * @param { pseudo element after/before } pseudoElt
 * getPseudoElementText
 * executing a js function to obtain the text of pseudo element (after/before)
 */

exports.command = function(cssSelector, cb, pseudoElt = 'after') {
  const browser = this;

  browser.execute(
    function(cssSelector, pseudoElt) {
      return window.getComputedStyle(document.querySelector(cssSelector), `:${pseudoElt}`).getPropertyValue('content');
    },
    [cssSelector, pseudoElt],
    cb
  );

  return this;
};
