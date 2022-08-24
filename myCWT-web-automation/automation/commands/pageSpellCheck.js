/**
 * @param [wordsToExclude], dicFile, dicFilePath
 * This function is testing spelling in a current page, using dictionary file.
 */
const SpellChecker = require('simple-spellchecker');

exports.command = function(cssPath = 'body', attribute = 'innerText', wordsToExclude, dicFile, dicFilePath) {
  const browser = this;

  browser
    // Fetching all text from the page and removing unnecessary characters.
    .waitForElementPresent(cssPath)
    // .waitForAttribute(attribute)    //TODO: replace this function its not working.
    .getAttribute('body', 'innerText', function(result) {
      let wordsToCheck = [
        ...new Set(
          result.value
            .replace(/[`~!@#©$%^&*()_|+\-–=?;:",.<>{}[]\\\/]|[0-9]/gi, ' ')
            .replace(/\s+/g, ' ')
            .toLowerCase()
            .trim()
            .split(' ')
        ),
      ];

      wordsToCheck = wordsToCheck.filter(word => wordsToExclude.every(exc => word.indexOf(exc) === -1));

      let wordsNum = wordsToCheck.length;

      console.log(
        '-----------------------------------------------------------\n' +
          wordsNum +
          ' words were checked for spelling mistakes in this test:\n-----------------------------------------------------------\n',
        wordsToCheck
      );

      // Check for spelling mistakes using dictionary file
      SpellChecker.getDictionary(dicFile, dicFilePath, function(err, dictionary) {
        if (err) {
          console.error(err);
          throw new Error(err);
        }

        const misspelledWords = [];

        for (let word of wordsToCheck) {
          if (!dictionary.spellCheck(word)) {
            misspelledWords.push(word);
          }
        }

        // Display error message including all misspelled words.
        if (misspelledWords.length > 0) {
          let missNum = misspelledWords.length;

          throw new Error('This test failed with ' + missNum + ' misspelled words: ' + misspelledWords);
        } else {
          // Or display success message if all passed
          console.log(
            '---------------------------------------\n' +
              'Spell check passed with no issues!' +
              '\n---------------------------------------'
          );
        }
      });
    });

  return this;
};
