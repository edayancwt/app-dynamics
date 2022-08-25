'use strict';

const OBTbuttonELement = '[data-testid=obt-button-container] > [data-testid=pill-button]';

module.exports = {

'@tags': ['stage', 'sanity', 'portal', 'travel arranger'],

  before: function (driver) {
    driver.windowMaximize();
  },

  'step 1 - login to portal': (driver) => {
    const login = driver.page.login();
    login.fillLoginDetails(driver.globals.users.portalUser9);
  },

  'step 2 - Validate home header items' : (driver) => {
    // Travel arranger name
    driver.waitForTextByCss('[data-testid=hero-name-of-traveler]', 'Portal Sanity');
    // Book your travelers... text
    driver.waitForTextByCss('[data-testid=hero-welcome-message]', 'Portal Sanity, book your travelers\' next trips');
    // Book my full trip button
    driver.waitForTextByCss(OBTbuttonELement, 'BOOK A FULL TRIP');
    driver.waitForAttributeContainsByCss(OBTbuttonELement, 'href', "https://accounts.mycwt.com/idp/startSSO.ping?PartnerSpId=KDS&ACSIdx=0");
  },

  'step 3 - Validate travel arranger my travelers list' : (driver) => {
    // click on my travelers link
    driver.waitAndClickByCss('[data-testid=header-navigation-myTravelers]');
    // check title
    driver.waitForTextByCss('[data-testid=page-title]', 'My travelers view');
    // check subtitles
    driver.waitForTextByCss('[data-testid=arranger-policies]', '- You can view and modify your travelers profile by accessing ‘My Travel Profile’');
    // search pre-text
    driver.waitForAttributeContainsByCss('[data-testid=my-travelers-search-input]', 'placeholder', 'Search Travelers');
    // search icon
    driver.waitForAttributeContainsByCss('[data-testid=input-icon-search]', 'class', "CwtIcons__StyledIcon-sc-1zecbe-0 styles__StyledIcon-n24pwb-0 lcarwX CwtIcons-sc-1zecbe-1 bThmWo");
  },

  'step 4 - Validate first traveler' : (driver) => {
    // traveler name
    driver.waitForTextByCss('[data-testid=traveler-1] [data-testid=ta-name]', 'Portal Sanity Sanity Four');
    // upcoming trip
    driver.waitForTextByCss('[data-testid=traveler-1] [data-testid=upcoming-trip-link-1]', 'Trip to Philadelphia, PA');
    // date
    driver.waitForTextByCss('[data-testid=traveler-1] [data-testid=ta-trip-dates]', 'Mar 2 - Mar 8, 2020');
    // missing hotel
    driver.waitForTextByCss('[data-testid=traveler-1] [data-testid=ta-ma-indicator]', 'Missing Hotel');
    // View all trips link
    driver.waitForTextByCss('[data-testid=view-all-trips-link-1]', 'view all trips');
    // Book hotel button
    driver.waitForTextByCss('[data-testid=book-hotel-btn-1]', 'BOOK A HOTEL');
  },

  'step 5 - Validate third traveler (no trips)' : (driver) => {
    // traveler name
    // driver.waitForTextByCss('[data-testid=traveler-2] [data-testid=ta-name]', 'Portal Sanity Sanity Three'); TODO: have a defect. #614
    // no upcoming trips text
    driver.waitForTextByCss('[data-testid=traveler-3] [data-testid=ta-details]', 'no upcoming trips');
    // View all trips link
    // driver.waitForTextByCss('[data-testid=view-all-trips-link-3]', 'view all trips');
    // Book hotel button
    driver.waitForTextByCss('[data-testid=book-hotel-btn-3]', 'BOOK A HOTEL');
  },

  'step 6 - Validate travel arranger search' : (driver) => {
    // add existing text in the search field
    driver.waitAndSetValueByCss('[data-testid=my-travelers-search-input]', 'sanity one');
    // validate traveler exist in the list
    // driver.waitForTextByCss('[data-testid=traveler-1] [data-testid=ta-name]', 'Portal Sanity Sanity Four');
    // click on clear text button
    driver.waitAndClickByCss('[data-testid=input-icon-search]');
    // add non-existing text in the search field
    driver.waitAndSetValueByCss('[data-testid=my-travelers-search-input]', 'bla bla');
    // validate search image
    // driver.waitForAttributeContainsByXpath('//*[@id="shell"]/div[1]/div/div/div[2]/img', 'src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODciIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4NyA2MCI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTAgNTkuODQ4aDg2LjQ5MlYwSDB6Ii8+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik03OS4yNjcgMzcuODkyVi42MjhINy4yMjV2MzcuMjY0SC42MjhWNDkuMDdjMCA1LjYwNSA0LjU0NSAxMC4xNSAxMC4xNSAxMC4xNUg3NS43MTRjMi44MDMgMCA1LjM0LTEuMTM3IDcuMTc3LTIuOTczYTEwLjE5MiAxMC4xOTIgMCAwIDAgMS45NzItMi43NzcgMTAuMTEgMTAuMTEgMCAwIDAgMS00LjRWMzcuODkyaC02LjU5NnoiLz4KICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHBhdGggZmlsbD0iI0U4RUZFRiIgZD0iTTkuMzIgMzcuODkyaDY5Ljk0N1YuNjI4SDkuMzE5eiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM5OUFDQUQiIGQ9Ik0xMC4yMjMgMzcuODkySDc2LjI3VjMuMjk1SDEwLjIyM3oiIG1hc2s9InVybCgjYikiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjQ0VEN0Q4IiBkPSJNMTQuNDEyIDM3Ljg5MmgtNC4xODlWMy4yOTVsNC4xODkgNy40NjJ6IiBtYXNrPSJ1cmwoI2IpIi8+CiAgICAgICAgPHBhdGggZmlsbD0iI0NFRDdEOCIgZD0iTTcyLjA4IDEwLjc1N0gxNC40MTJsLTQuMTg5LTcuNDYySDc2LjI3eiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNDRUQ3RDgiIGQ9Ik03Mi4wOCAzNy44OTJoNC4xODlWMy4yOTVsLTQuMTg5IDcuNDYyeiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNFOEVGRUYiIGQ9Ik04NS44NjQgNDkuMDdWMzcuODkySDIuNzIzVjQ5LjA3YzAgNS42MDUgNC41NDQgMTAuMTUgMTAuMTUgMTAuMTVoNjIuODQxYzUuNjA1IDAgMTAuMTUtNC41NDUgMTAuMTUtMTAuMTUiIG1hc2s9InVybCgjYikiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjNDA1RDYyIiBkPSJNNy44NTMgMzcuMjY0SDc4LjY0VjEuMjU3SDcuODUzdjM2LjAwN3ptNzEuNDE0IDEuMjU3SDcuMjI1YS42MjkuNjI5IDAgMCAxLS42MjgtLjYyOVYuNjI4YzAtLjM0Ny4yODEtLjYyOC42MjgtLjYyOGg3Mi4wNDJjLjM0NyAwIC42MjguMjgxLjYyOC42Mjh2MzcuMjY0YS42MjkuNjI5IDAgMCAxLS42MjguNjI5eiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM0MDVENjIiIGQ9Ik0xMC44NTIgMzcuMjY0SDc1LjY0VjMuOTI0SDEwLjg1djMzLjM0em02NS40MTcgMS4yNTdIMTAuMjIzYS42MjguNjI4IDAgMCAxLS42MjgtLjYyOVYzLjI5NWMwLS4zNDcuMjgxLS42MjguNjI4LS42MjhINzYuMjdjLjM0NyAwIC42MjguMjgxLjYyOC42Mjh2MzQuNTk3YS42MjguNjI4IDAgMCAxLS42MjguNjI5eiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM0MDVENjIiIGQ9Ik0xNC43OCAxMC4xMjloNTYuOTMzbDMuNDgzLTYuMjA2aC02My45bDMuNDg0IDYuMjA2em01Ny4zIDEuMjU3SDE0LjQxMmEuNjI4LjYyOCAwIDAgMS0uNTQ4LS4zMjFMOS42NzUgMy42MDNhLjYyNy42MjcgMCAwIDEgLjU0OC0uOTM2SDc2LjI3YS42MjkuNjI5IDAgMCAxIC41NDguOTM2bC00LjE4OSA3LjQ2MmEuNjI4LjYyOCAwIDAgMS0uNTQ4LjMyeiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM0MDVENjIiIGQ9Ik0xMC44NTEgMzcuMjY0aDIuOTMzVjEwLjkyMkwxMC44NSA1LjY5OHYzMS41NjZ6bTMuNTYgMS4yNTdoLTQuMTg4YS42MjkuNjI5IDAgMCAxLS42MjgtLjYyOVYzLjI5NWEuNjI5LjYyOSAwIDAgMSAxLjE3Ni0uMzA4bDQuMTg5IDcuNDYzYy4wNTMuMDk0LjA4LjIuMDguMzA3djI3LjEzNWEuNjI5LjYyOSAwIDAgMS0uNjI4LjYyOXpNNzIuNzA5IDM3LjI2NGgyLjkzMlY1LjY5OGwtMi45MzIgNS4yMjR2MjYuMzQyem0zLjU2IDEuMjU3SDcyLjA4YS42MjkuNjI5IDAgMCAxLS42MjgtLjYyOVYxMC43NTdjMC0uMTA4LjAyOC0uMjEzLjA4LS4zMDdsNC4xODktNy40NjNhLjYyOS42MjkgMCAwIDEgMS4xNzYuMzA4djM0LjU5N2EuNjI4LjYyOCAwIDAgMS0uNjI4LjYyOXoiIG1hc2s9InVybCgjYikiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjNDA1RDYyIiBkPSJNMS4yNTcgMzguNTJ2MTEuMDA3YzAgNC45OTggNC4wNjYgOS4wNjQgOS4wNjQgOS4wNjRoNjUuODVjNC45OTggMCA5LjA2NC00LjA2NiA5LjA2NC05LjA2NFYzOC41MkgxLjI1N3pNNzYuMTcgNTkuODQ5aC02NS44NUM0LjYzIDU5Ljg0OCAwIDU1LjIxOCAwIDQ5LjUyN1YzNy44OTJjMC0uMzQ2LjI4MS0uNjI4LjYyOC0uNjI4aDg1LjIzNmMuMzQ3IDAgLjYyOC4yODIuNjI4LjYyOHYxMS42MzVjMCA1LjY5LTQuNjMgMTAuMzItMTAuMzIgMTAuMzJ6IiBtYXNrPSJ1cmwoI2IpIi8+CiAgICAgICAgPHBhdGggZmlsbD0iIzQwNUQ2MiIgZD0iTTQ2LjE4NyA1Mi41NGgtNS44ODJjLTMuNjcxIDAtNi42NTctMi40My02LjY1Ny01LjQydi0xLjY5N2EuODUyLjg1MiAwIDEgMSAxLjcwMyAwdjEuNjk3YzAgMi4wNSAyLjIyMyAzLjcxNyA0Ljk1NCAzLjcxN2g1Ljg4MmMyLjczMSAwIDQuOTU0LTEuNjY3IDQuOTU0LTMuNzE3di0xLjY5N2EuODUyLjg1MiAwIDEgMSAxLjcwNCAwdjEuNjk3YzAgMi45OS0yLjk4NyA1LjQyLTYuNjU4IDUuNDIiIG1hc2s9InVybCgjYikiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjNDA1RDYyIiBkPSJNNDcuNzQyIDUyLjY0MmgtOC43NDhhMS4zNSAxLjM1IDAgMSAxIDAtMi43MDFoOC43NDhhMS4zNSAxLjM1IDAgMSAxIDAgMi43IiBtYXNrPSJ1cmwoI2IpIi8+CiAgICAgICAgPHBhdGggZmlsbD0iI0UyRTdFRSIgZD0iTTY5LjYzNiA1My4zMjhsLTQuODkgNC40Mi00Ljg5Mi00LjQyIDEuMTUtMTYuNDc2aDcuNDgzeiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiNDRUQ3RDgiIGQ9Ik02OC45MzggNDUuMTI2bC04Ljc3NyA1LjYxMy0uMjA0IDIuOTE3IDEuMjE4Ljg2NiA4LjA2LTUuMTU1ek02MC4zNzcgNDUuODNsOC4zNjMtNS4zNDgtLjI1My0zLjYzaC0xbC02Ljc4NyA0LjM0eiIgbWFzaz0idXJsKCNiKSIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM0MDVENjIiIGQ9Ik02MC41MDIgNTMuMDY3bDQuMjQzIDMuODM1IDQuMjQ0LTMuODM1TDY3LjkgMzcuNDhINjEuNTlsLTEuMDg3IDE1LjU4N3ptNC4yNDMgNS4zMWEuNjI2LjYyNiAwIDAgMS0uNDIxLS4xNjJsLTQuODkxLTQuNDIxYS42MjguNjI4IDAgMCAxLS4yMDYtLjUxbDEuMTUtMTYuNDc2YS42MjguNjI4IDAgMCAxIC42MjYtLjU4NGg3LjQ4NGMuMzMgMCAuNjA0LjI1NS42MjcuNTg0bDEuMTQ5IDE2LjQ3NmEuNjI4LjYyOCAwIDAgMS0uMjA1LjUxbC00Ljg5MSA0LjQyYS42MjcuNjI3IDAgMCAxLS40MjIuMTYzeiIgbWFzaz0idXJsKCNiKSIvPgogICAgPC9nPgo8L3N2Zz4K');
    // validate not found text
    driver.waitForTextByCss('[data-testid=conditional-state-title]', 'we couldn’t find any matches. \nmake sure your search is spelled correctly.');
    // click on clear text button
    driver.waitAndClickByCss('[data-testid=input-icon-search]');
  },

  'step 7 - Validate travel arranger my travelers links' : (driver) => {
    // click on first traveler trip
    driver.waitAndClickByCss('[data-testid=upcoming-trip-link-1]');
    // traveler trip details - breadcrumb links
    driver.waitForTextByCss('[data-testid=home-link]', "HOME");
    driver.waitForTextByCss('[data-testid=my-travelers-link]', "MY TRAVELERS");
    driver.waitForTextByCss('[data-testid=traveler-trips]', "PORTAL SANITY SANITY FOUR");
    // trip title
    driver.waitForTextByCss('[data-testid=hero-title]', "Portal Sanity Sanity Four's Trip to Philadelphia, PA");
    driver.waitForTextByCss('[data-testid=hero-dates]', "Mar 2 - Mar 8, 2020 | 7 days");
    // back to my travelers list
    driver.waitAndClickByCss('[data-testid=header-navigation-myTravelers]');
    // click on first traveler "view all trips" link
    driver.waitAndClickByCss('[data-testid=view-all-trips-link-1]', 'view all trips');
    // trip title (traveler trips page)
    driver.waitForTextByCss('[data-testid=trip-984998] [data-testid=trip-name]', "Trip to Philadelphia, PA");
    driver.waitForTextByCss('[data-testid=trip-984998] [data-testid=trip-dates]', "Mar 2 - Mar 8, 2020");
    // back to my travelers list
    driver.waitAndClickByCss('[data-testid=header-navigation-myTravelers]');
    // click on first traveler "book a hotel" link
    driver.waitAndClickByCss('[data-testid=book-hotel-btn-1]');
    driver.waitForUrlToContain('travel.stage-mycwt.com/book-a-hotel', 20000);
    driver.waitForTextByCss('.notification-banner--travel-arranger', 'Booking a hotel for Portal Sanity Sanity Four');
  },

  'step 8 - Logout' : (driver) => {
    driver.waitAndClickByCss('[data-testid=account-dropdown-button]');
    driver.pause(1000);
    driver.waitAndClickByCss('[data-testid=header-logout]');
  },
};

//TODO: Add new traveler with no booking capability (sub with no booking)