module.exports = {

  selectors: {

    main: {
      saveButton: '//*[@id="shell"]/div[4]/div/div/div/div/form/div[2]/button[2]',
      skipButton: '//*[@id="shell"]/div[4]/div/div/div/div/form/div[2]/button[1]',
      closeButton: '[data-testid="icon-Close"]',
      mainTitle: '.styles__Title-nf7a64-3',
      textContent: '.styles__Description-nf7a64-4',
      phoneInput: '.form-control',
      phoneInputErrorMessage: '[data-testid="error-message"]',
      phoneImage: '.styles__FormImg-nf7a64-0',
      callingCodeSelector: '//*[@id="shell"]/div[4]/div/div/div/div/form/div[1]/div/div/div/div',
      phoneSavedMessage: '[data-testid="icon-Close"]',
    },
  }
};