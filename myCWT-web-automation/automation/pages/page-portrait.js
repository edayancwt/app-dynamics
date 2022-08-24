module.exports = {

  selectors: {

    main: {
      closeTab: '//*[@id="root"]/div/div/div/div[2]/div/ul/li[2]/a/div/button',
    },

    search: {
      searchAcrossClientsCheckBox: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[1]/div[1]/div/label/input',
      searchAcrossClientsTitle: '[data-reactid=.0.0.0.1.0.1.$travelerSearch/=1$travelerSearch.0.0.0.0.0.0.2.2.0.0.$checkboxRadioWrapper.$label.1]',
      client: 'input[data-reactid=".0.0.0.1.0.1.$travelerSearch/=1$travelerSearch.0.0.0.0.0.0.2.2.0.1.1.1.1.0"]',
      firstClient: '.Select-option.is-focused',
      name: '[label=Name]',
      email: '[data-test-id=appTab_search] > div > table > tbody > tr > td.left-column > div > div:nth-child(3) > form > div:nth-child(3) > input',
      pin: '[label=Pin]',
      externalSysId: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[5]/input',
      thirdPartySyncId: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[6]/div[1]/input',
      guid: '[label=GUID]',
      includeInactiveProfilesCheckBox: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[7]/div/label/input',
      includeInactiveProfilesTitle: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[7]/div/label/span',
      addTravelerButton: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[1]/div/div[2]/form/div[8]/button[1]',
      searchButton: '[type=submit]',
    },

    searchResults: {
      resultsName: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td[1]',
      resultsPin: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td[2]',
      resultsId: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td[3]',
      resultsClientInformation: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td[4]',
      resultsStatus: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td[6]',
      resultsStatusText: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/table/tbody/tr/td[6]/div/label[1]',
      noResultsUpperText: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/h5',
      noResultsLowerText: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/span',
      skipThisStepButton: '.inverse-orange-button',
    },

    validations: {
      subunitValidation: '[data-test-id=appTab_search] > div > table  > tbody > tr > td.right-column > div:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > div > div:nth-child(2) > div.panel-body > div > div > div.add-space-below > div > form > div:nth-child(1) > div > div.col-xs-3.control-label > div > div.col-xs-1.glyphicon.glyphicon-alert.text-right',
      travellerTypeValidation: '#root > div > div > div > div:nth-child(2) > div > div > div > div > table > tbody > tr > td.right-column > div:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > div > div:nth-child(2) > div.panel-body > div > div > div.add-space-below > div > form > div:nth-child(2) > div > div.col-xs-3.control-label > div > div.col-xs-1.glyphicon.glyphicon-alert.text-right',
      firstNameValidation: '#root > div > div > div > div:nth-child(2) > div > div > div > div > table > tbody > tr > td.right-column > div:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > div > div:nth-child(2) > div.panel-body > div > div > div.add-space-below > div > form > div:nth-child(3) > div > div.col-xs-3.control-label > div > div.col-xs-1.glyphicon.glyphicon-alert.text-right',
      lastNameValidation: '#root > div > div > div > div:nth-child(2) > div > div > div > div > table > tbody > tr > td.right-column > div:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > div > div:nth-child(2) > div.panel-body > div > div > div.add-space-below > div > form > div:nth-child(5) > div > div.col-xs-3.control-label > div > div.col-xs-1.glyphicon.glyphicon-alert.text-right',
      titleValidation: '#root > div > div > div > div:nth-child(2) > div > div > div > div > table > tbody > tr > td.right-column > div:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > div > div:nth-child(2) > div.panel-body > div > div > div.add-space-below > div > form > div:nth-child(6) > div > div.col-xs-3.control-label > div > div.col-xs-1.glyphicon.glyphicon-alert.text-right',
      emailValidation: '#root > div > div > div > div:nth-child(2) > div > div > div > div > table > tbody > tr > td.right-column > div:nth-child(2) > div:nth-child(2) > table > tbody > tr > td > div > div:nth-child(3) > div > div > div > div.add-space-below > div > form > div:nth-child(2) > div > div.col-xs-3.control-label > div > div.col-xs-1.glyphicon.glyphicon-alert.text-right',
    },

    travellerDetails: {
      subunit: '#addTravelerInfoformsubunit',
      submitChangesButton: '[data-testid=submitButton]',
      travellerType: '#addTravelerInfoformtravelerType',
      firstName: '#addTravelerInfoformfirstName',
      middleName: '#TravelerDetails_TravelerInfo_form_middleName',
      lastName: '#addTravelerInfoformlastName',
      title: '#addTravelerInfoformprefix',
      emailAddress: '#addEmailAddressformaddress',
      ESIDCreate: '#addTravelerInfoformemployeeId',
      ESIDUpdate: '#TravelerDetails_TravelerInfo_form_EmplId',
      GUIDUpdate: 'TravelerDetails_TravelerInfo_form_guid',
      saveAndAdd: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/div[1]/button[1]',
      saveAndExit: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/div[1]/button[2]',
      saveAndEdit: '//*[@id="root"]/div/div/div/div[2]/div/div/div/div/table/tbody/tr/td[2]/div[2]/div[2]/div[1]/button[3]',
      subunit1: '//*[@id="addTravelerInfoformsubunit"]/option[1]',
      subunit2: '//*[@id="addTravelerInfoformsubunit"]/option[2]',
      subunit3: '//*[@id="addTravelerInfoformsubunit"]/option[3]',
      subunit4: '//*[@id="addTravelerInfoformsubunit"]/option[4]',
      travellerType1: '//*[@id="addTravelerInfoformtravelerType"]/option[1]',
      travellerType2: '//*[@id="addTravelerInfoformtravelerType"]/option[2]',
      travellerType3: '//*[@id="addTravelerInfoformtravelerType"]/option[3]',
      travellerType4: '//*[@id="addTravelerInfoformtravelerType"]/option[4]',
      title1: '//*[@id="addTravelerInfoformprefix"]/option[1]',
      title2: '//*[@id="addTravelerInfoformprefix"]/option[2]',
      title3: '//*[@id="addTravelerInfoformprefix"]/option[3]',
      title4: '//*[@id="addTravelerInfoformprefix"]/option[4]',
      prefix1: '//*[@id="addTravelerInfoformprefix"]/option[1]',
      prefix2: '//*[@id="addTravelerInfoformprefix"]/option[2]',
      carlsonId: '#addTravelerInfoformemployeeId',
      gender1: '//*[@id="TravelerDetails_TravelerInfo_form_gender"]/option[1]',
      gender2: '//*[@id="TravelerDetails_TravelerInfo_form_gender"]/option[2]',
      gender3: '//*[@id="TravelerDetails_TravelerInfo_form_gender"]/option[3]',
      suffix: '#TravelerDetails_TravelerInfo_form_suffix',
      deactivateProfileButton: '//*[@id="root"]/div/div/div/div[2]/div/div/div[2]/div/table/tbody/tr/td[1]/div[3]/div[2]/span/button',
      deactivatePopUpTitle: '/html/body/div[2]/div/div[2]/div/div/div/div[1]',
      deactivatePopUpText: '/html/body/div[2]/div/div[2]/div/div/div/div[2]',
      deactivatePopUpYes: '/html/body/div[2]/div/div[2]/div/div/div/div[3]/button[1]',
      deactivatePopUpNo: '/html/body/div[2]/div/div[2]/div/div/div/div[3]/button[2]',
    },

    upperPopUpMessage: {
      text: '//*[@id="root"]/div/div/div/div[5]/div/span/div/div[2]',
      close: '//*[@id="root"]/div/div/div/div[5]/div/span/div/div[3]',
    },

    phoneNumber: {
      phoneNumberTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(2) > div.panel-heading > h4 > a',
      addButton: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(2) > div.panel-collapse.collapse.in > div > div > div > div.button-strip > button:nth-child(1)',
      type: '[id$="_phoneType"]',       // id ends with "_phoneType"
      country: '[id$="_country"]',
      phoneNumberField: '[id$="_phoneNumber"]',
    },

    emailAddress: {
      emailAddressTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(3) > div.panel-heading > h4 > a',
      emailAddressField: '#TravelerDetails_EmailAddress_0_address',
      receiveInvoice: '#TravelerDetails_EmailAddress_0_receiveEInvoiceFlag',
      receiveItinerary: '#TravelerDetails_EmailAddress_0_receiveEItineraryFlag',
    },

    address: {
      addressTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(4) > div.panel-heading > h4 > a',
      addButton: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(4) > div.panel-collapse.collapse.in > div > div > div > div.button-strip > button:nth-child(1)',
      type: '[id$="_contactType"]',
      preferred: '[id$="_prefered"]',
      country: '[id$="_country"]',
      addressLine1: '[id$="_firstAddressLine"]',
      addressLine2: '[id$="_secondAddressLine"]',
      city: '[id$="_cityName"]',
      postalCode: '[id$="_postalCode"]',
    },

    emergencyContact: {
      emergencyContactTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(5) > div.panel-heading > h4 > a',
      decline: '#TravelerDetails_EmergencyContact_form_refusedFlag',
      name: '#TravelerDetails_EmergencyContact_form_name',
      relationship: '#TravelerDetails_EmergencyContact_form_relationship',
      country: '#TravelerDetails_EmergencyContact_form_countryCode',
      phoneNumber: '#TravelerDetails_EmergencyContact_form_phoneNumber',
    },

    travelDocuments: {
      travelDocumentsTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(6) > div.panel-heading > h4 > a',
      addTravelDocumentsButton: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(6) > div.panel-collapse.collapse.in > div > div > div:nth-child(1) > div.button-strip > button:nth-child(1)',
      documentType: '[id$="_documentType"]',
      number: '[id$="_documentNumber"]',
      country: '[id$="_country"]',
      expirationDate: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(6) > div.panel-collapse.collapse.in > div > div > div:nth-child(1) > div.add-space-below > div > div > form > div:nth-child(5) > div > div.col-xs-9.form-group > div > div > div > div > div.input-group.date > input',
      city: '[id$="_issuancePlace"]',
      countryOfIssue: '[id$="_issuanceCountry"]',
      issueDate: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(6) > div.panel-collapse.collapse.in > div > div > div:nth-child(1) > div.add-space-below > div > div > form > div:nth-child(8) > div > div.col-xs-9.form-group > div > div > div > div > div.input-group.date > input',
      addSecurityDocumentButton: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(6) > div.panel-collapse.collapse.in > div > div > div:nth-child(3) > div.button-strip > button:nth-child(1)',
      securityDocument: '[id$="_flightSecurityType"]',
      securityDocumentNumber: '[id$="_flightSecurityNumber"]',
    },

    driverLicense: {
      driverLicenseTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(7) > div.panel-heading > h4 > a',
      addDriverLicenseButton: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(7) > div.panel-collapse.collapse.in > div > div > div > div.button-strip > button:nth-child(1)',
      licenseNumber: '[id$="_licenseNumber"]',
      country: '[id$="_issueCountry"]',
      expirationDate: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(7) > div.panel-collapse.collapse.in > div > div > div > div.add-space-below > div > div > form > div:nth-child(3) > div > div.col-xs-9.form-group > div > div > div > div > div.input-group.date > input',
      placeOfIssue: '[id$="_issuePlace"]',
      issueDate: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(7) > div.panel-collapse.collapse.in > div > div > div > div.add-space-below > div > div > form > div:nth-child(5) > div > div.col-xs-9.form-group > div > div > div > div > div.input-group.date > input',
    },

    citizenship: {
      citizenshipTab: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(8) > div.panel-heading > h4 > a',
      addCitizenshipButton: '[data-test-id=appTab_traveler_0] > div > table > tbody > tr > td.right-column > div > div > div.panel-group > div:nth-child(8) > div.panel-collapse.collapse.in > div > div > div > div.button-strip > button:nth-child(1)',
      country: '[id$="_country"]',
    }
  }
};