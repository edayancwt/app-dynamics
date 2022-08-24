'use strict';
let accountSettingsCommands = {
  changePassword: function(currentPassword, newPassword) {
    return this
      .waitAndSetValue('@currentPasswordInput', currentPassword)
      .pause()
      .waitAndSetValue('@newPasswordInput', newPassword)
      .pause()
      .click('@saveChangesButton')
      .waitForElementVisible('@saveSuccessMessage')
      .pause();
  },
  pause: function () {
    this.api.pause(500);
    return this;
  }
};

module.exports = {
  commands: [accountSettingsCommands],
  elements: {
    currentPasswordInput: {
      selector: '#currentPasswordFormGroup input[type=password]'
    },
    newPasswordInput: {
      selector: '#newPasswordFormGroup input[type=password]'
    },
    saveChangesButton: {
      selector: 'button.submit-button'
    },
    saveSuccessMessage: {
      selector: 'p.saved-succeeded'
    }
  }
};