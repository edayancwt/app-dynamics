module.exports = {

  selectors: {

    identifyClient: {
      clientNameInput: '#idClientInput',
      selectButton: '#clientStandardButton-button',
      firstResult: '#idClientContainer > div > div.yui-ac-bd > ul > li.yui-ac-highlight',
    },

    menu: {
      profileServices: '#yui-gen2',
      profile: '#yui-gen4',
      profileLoad: '#yui-gen4',
      clientNameInput: '#clientName',
      findButton: '//*[@id="clientDetailsForm"]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td[2]/a',
      firstResult: '//*[@id="clientDetailsForm"]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table/tbody/tr[5]/td[2]/select/option[1]',
      continueButton: '//*[@id="clientDetailsForm"]/table/tbody/tr[3]/td/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table/tbody/tr[7]/td[2]/a',
    },

    login: {
      usernameInput: '#UserID',
      passwordInput: '#UserIdentifier',
      okButton: '.button_nonactive',
    },

    basicInformation: {
      profileLoadName: '#clientLoadDefnName',
      fileLocationInput: '#fullFileName',
      ongoingLoad: '#ongoingLoadFlag1',
      submitButton: '//*[@id="PALForm"]/table[2]/tbody/tr[2]/td[2]/table/tbody/tr/td/table[3]/tbody/tr[4]/td[2]/a'
    },

    testRunLoad: {
      testButton: '//*[@id="command"]/table[2]/tbody/tr[5]/td[2]/a',
      runButton: '//*[@id="command"]/table[2]/tbody/tr[5]/td[4]/a'
    },

    history: {
      runHistoryFirstResults: '#table-2 > tbody > tr:nth-child(1) > td:nth-child(2) > a',
    },

    fileMapping: {
      applyButton: '//*[@id="hidesubmit"]/center/table/tbody/tr[3]/td/a',
      removeButton: '[name=RemoveBtn]',
    },

    report: {
      reportText: 'body > pre > font',
    }

  }
};