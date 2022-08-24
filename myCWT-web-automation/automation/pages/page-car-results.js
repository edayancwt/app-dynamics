module.exports = {

  selectors: {

    breadcrumbs: {
      selectACarIcon: '//*[@id="main-content"]/section/div[2]/div[1]/div[2]/div[1]/div',
      selectACarText: '//*[@id="main-content"]/section/div[2]/div[1]/div[2]/div[1]/span',
      checkoutIcon: '//*[@id="main-content"]/section/div[2]/div[1]/div[2]/div[3]/div',
      checkoutText: '//*[@id="main-content"]/section/div[2]/div[1]/div[2]/div[3]/span',
      confirmationIcon: '//*[@id="main-content"]/section/div[2]/div[1]/div[2]/div[5]/div',
      confirmationText: '//*[@id="main-content"]/section/div[2]/div[1]/div[2]/div[5]/span',
    },

    filter: {
      filterTitle: '[data-testid=main] > section > div.styles__CarResultsWrapper-x0amr7-0.fSszUx > div.styles__ResultsWrapper-x0amr7-3.jiRWak > div.styles__FiltersWrapper-sc-1yd0p3t-0.iOCTGU > div.styles__StyledHeaderWrapper-sc-1yd0p3t-1.dIrOuM > div > span',
      clearButton: '[data-testid=button-anchor] > span',
    },

  }
};