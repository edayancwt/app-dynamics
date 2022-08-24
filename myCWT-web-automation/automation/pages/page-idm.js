module.exports = {

  selectors: {

    main: {
      username: '#username',
      password: '#password',
      loginButton: '.btn-primary',
    },

    search: {
      userInput: '.search-input',
      topInput: '/html/body/div/div/div[3]/div[2]/form/div/div[2]/input',
      subInput: '/html/body/div/div/div[3]/div[2]/form/div/div[3]/input',
      searchButton: '[type=submit]',
      usersCheckbox: '#users',
      organizationCheckbox: '#organizations',
    },

    searchResults: {
      // userInput: '.search-input',
      name: '/html/body/div/div/div[3]/div[2]/table/tbody/tr/td[1]',
      status: '/html/body/div/div/div[3]/div[2]/table/tbody/tr/td[2]',
      registered: '/html/body/div/div/div[3]/div[2]/table/tbody/tr/td[3]',
      username: '.username',
      employeeID: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[6]/p[2]/span',
      pin: '.pin',
      topUnit: '.sub',
      email: '.email',
      noResultsText: '.no-results',
      attributesButton: '.attr-btn',
      rolesButton: '.roles-btn',
    },

    travellerAttributes: {
      subUnit: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[1]/p[2]/a',
      idmEmail: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[2]/p[2]/span[1]',
      workEmail: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[3]/p[2]',
      mobilePhone: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[4]/p[2]',
      status: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[5]/p[2]',
      employeeID: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[6]/p[2]',
      guid: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[7]/p[2]',
      travellerTypeGuid: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[1]/div[8]/p[2]',
      thirdPartySyncID: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[1]/p[2]',
      pin: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[2]/p[2]',
      idmID: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[3]/p[2]',
      username: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[4]/p[2]',
      password: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[5]/p[2]',
      effectiveTime: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[8]/p[2]',
      expirationTime: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[9]/p[2]',
      idmType: '/html/body/div/div/div[3]/div[2]/div[4]/div/div[2]/div[10]/p[2]',
    },

    travellerRoles: {
      clientContactAdmin: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[1]/div/button',
      traveller: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[2]/button',
      travelArranger: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[1]/div[3]/button',
      analytiqsUser: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[2]/div[1]/button',
      cwtAdmin: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[2]/div[2]/button',
      globalContentAdmin: '//*[@id="app"]/div/div[3]/div[2]/div[4]/div/div[2]/div[3]/button',
    },
  }
};