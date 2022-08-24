module.exports = {

  selectors: {

    main: {
      loginLink: '.nav-wrapper > .list-inline > :nth-child(1) > a',
      languageSelectorText: '#locale-selection-dropdown',
      languageSelectorIcon: '.i',
      userIcon: '#forgot-username-icon',
      passwordResetTitle: '#forgot-password-title',
      passwordResetText: '#forgot-password-description',
      usernameInput: '#usernameField',
      usernameInputIcon: '#username-icon',
      forgotUsernameLink: '#forgot-username-link',
      nextButton: '#submit-button',
      myCwtLogo: '.col-sm-12 > .m-b-lg',
      myCwtTitle: '.font-light',
    },

    checkYourEmail: {
      checkYourEmailImage: '.svg-icon',
      checkYourEmailTitle: '#check-email-title',
      checkYourEmailText: '#email-sent',
    },

    createNewPassword: {
      createNewPasswordTitle: '#password-changed-title',
      passwordInput: '#newPassword',
      passwordInputIcon: '.cwt-icon-lock',
      createPasswordButton: '#submit-button',
      passwordPolicyTooltip: '.popover',
      invalidPasswordMessage: '#pfRegPassword',
      invalidPasswordIcon: '.cwt-icon-alert',
  },

    passwordWasChanged: {
      successImage: '.icon-big-success',
      successTitle: '#password-changed-title',
      successText: '#password-changed-description',
      successDoneButton: '#login-url-continue',
    },

    footer: {
      helpCenter: '#help-center-link',
      cookiePolicy: '#cookie-policy-link',
      termsOfUse: '#terms-of-use-link',
      privacyPolicy: '#privacy-policy-link',
      copyrightsText: '#copyrights',
    }
  }
};