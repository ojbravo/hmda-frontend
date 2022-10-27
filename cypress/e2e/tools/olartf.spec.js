import { isTS } from "../../../src/tools/larft/utils"
import { isCI, isProd, isBeta } from "../../support/helpers"

const { HOST, ENVIRONMENT } = Cypress.env()

let baseURLToVisit = isCI(ENVIRONMENT) ? "http://localhost:3000" : HOST

let urlForTesting = baseURLToVisit + "/tools/lar-formatting"

/*

1. Upload file - WIP
2. Download file - covered in specific record testing [X]
3. Clear saved - removes all records [X]
4. User navigates from page and prompts user that data will be lost [X]
5. Test “Filter columns” functionality [X]
6. Test “Filter by label” functionality [X]
7. Test “Search TS” functionality [X]
8. Test “Search LAR” functionality [X]

Record Specific testing:
1. User generates a TS record and ensure `Column 1` dropdown changes to LAR [x]
2. Different tests to interact with drop-downs, input fields and buttons [X]
    1. Test update row functionality [X]
    2. Test delete row functionality [X]
3. User generates a TS record that includes calendar year, quarter and LEI. Download the file and ensure the name of the file includes equals `${year}-${quarter}-${lei}.txt`
4. User generates a LAR record and see that it’s reflected in the UI. [X]
    1. Different tests to interact with drop-downs, input fields and buttons [X]
    2. Test update row functionality [X]
    3. Test delete row functionality [X]
5. If user created a TS record and a LAR record ensure that another LAR record defaults in Column 1 [X]

*/

// Command used to grab ID from input fields and drop-down menus.
// Workaround as the IDs have a space in them i.e -> Calendar Year
Cypress.Commands.add("id", value => cy.get(`[id="${value}"]`))

describe("General OLART Tests", () => {
  it("Tests 'Filter by label' functionality", () => {
    cy.visit(urlForTesting)
    cy.get("#filter").click().type("Federal Agency")
    cy.get("#accordion-button-11").should("have.text", "Federal Agency")
    cy.get(".search-box > .clear").click()
    cy.get("#accordion-button-0").should("have.text", "Record Identifier")
  })

  it("Test TS 'Filter columns' and 'Search TS' functionality", () => {
    cy.visit(urlForTesting)
    // Generate TS
    cy.id("Calendar Year").select("2019")
    cy.id("Calendar Quarter").select("1 - Q1")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // "Filter columns" functionality
    cy.get(".filters > :nth-child(2) > input").click().type("calendar")
    cy.get("#header-calendar-year > .custom-cell-content").should(
      "have.text",
      "Calendar Year"
    )
    // Clear "Filer columns" via "Clear Filter" button
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Now testing "Search TS" functionality
    cy.get(".filters > :nth-child(1) > input").click().type("2019")
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "2019")
  })

  it("Tests LAR 'Search LAR' and 'Filter columns' functionality", () => {
    cy.visit(urlForTesting)
    // Need to generate TS first before a LAR record can be created
    cy.id("Calendar Year").select("2019")
    cy.id("Calendar Quarter").select("1 - Q1")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Generate LAR
    cy.id("Loan Type").select(
      "1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)"
    )
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // "Search LAR" functionality
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(1) > input")
      .click()
      .type("1")
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "1")
    // Clear "Search LAR" input
    cy.get(":nth-child(1) > .clear").click()
    // "Filter columns" functionality
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("Loan Type")
    cy.get("#header-loan-type > .custom-cell-content").should(
      "have.text",
      "Loan Type"
    )
  })

  it("Generate TS and LAR records then clear the records by clicking 'Clear Saved' button", () => {
    cy.visit(urlForTesting).contains("(LAR) Formatting Tool")
    // Generate TS Record with calendar year, quarter and LEI
    cy.id("Calendar Year").select("2019")
    cy.id("Calendar Quarter").select("1 - Q1")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Generate LAR Record
    cy.id("Loan Type").select(
      "1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)"
    )
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Clear Records
    cy.get(".clear").click()
    // Ensuring TS and LAR records have no saved records
    cy.get("#saved-ts > .no-records").should("have.text", "No Records Saved")
    cy.get("#saved-lars > .no-records").should("have.text", "No Records Saved")
  })

  it("Prompts user that data will be lost when navigating away from page", () => {
    cy.visit(urlForTesting)
    // Generates TS Record
    cy.id("Calendar Year").select("2019")
    cy.id("Calendar Quarter").select("1 - Q1")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    cy.get(":nth-child(4) > .nav-link").click()
    // Checks Cypress confirm message
    cy.on("window:confirm", text => {
      expect(text).to.contains(
        "You will lose any un-downloaded data! Are you sure you want to leave?"
      )
    })
  })

  it("Verifies downloaded filename includes Calendar Year, quarter and user inputted LEI otherwise filename defaults to LarFile", () => {
    cy.visit(urlForTesting)
    // Generates TS Record
    cy.id("Calendar Year").select("2019")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Filename attribute check - defaults to "LarFile" if calendar year, quarter and LEI isn't in the TS record
    cy.get(".export").invoke("attr", "data-filename").should("eq", "LarFile")

    cy.get(".clear").click()

    cy.id("Calendar Year").select("2019")
    cy.id("Calendar Quarter").select("1 - Q1")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Checks Download Button filename attribute
    cy.get(".export")
      .invoke("attr", "data-filename")
      .should("eq", "2019-1-1071FAKELEI")
  })

  it("File upload feature", () => {
    cy.visit(urlForTesting)
    const FILENAME = "2022-4-FAKELEI.txt"

    cy.fixture(FILENAME).then(fileContent => {
      cy.get(".upload", { force: true }).click().attachFile({
        fileContent,
        fileName: FILENAME,
        mimeType: "text/plain",
      })
    })

    cy.wait(1000)
  })
})

describe("Record specific tests", () => {
  it("TS Record is generated. Check that 'Column 1' disabled drop-down changes to LAR", () => {
    cy.visit(urlForTesting)
    // Generates TS Record
    cy.id("Calendar Year").select("2019")
    cy.id("Calendar Quarter").select("1 - Q1")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    cy.id("Record Identifier").contains("2 - LAR")
  })

  it("TS Record generated and LAR record generated. Ensure 'Column 1' still says '2 - LAR' in the disabled drop-down", () => {
    cy.visit(urlForTesting)
    // Generate TS - TS is required to be able to generate LAR records
    cy.id("Calendar Year").select("2019")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()

    // Generate LAR record - with drop-down, input field and button entries
    // Input field
    cy.id("Loan Amount").type("110500")
    // Drop-down
    cy.id("State").select("WA - Washington")
    // Zip Code enums -> click "NA" button option
    cy.get(
      ":nth-child(16) > .fieldValue > .enum-entry > .enums > :nth-child(1)"
    ).click()
    // Save LAR Record
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    cy.id("Record Identifier").contains("2 - LAR")
  })

  it("TS Record tests: functionality with drop-downs, input fields, update record and delete record", () => {
    cy.visit(urlForTesting)
    // Generate TS
    cy.id("Calendar Year").select("2019")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Drop-down check
    cy.get(".filters > :nth-child(1) > input").click().type("2019")
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "2019")
    // Clear "Search TS" filter
    cy.get(":nth-child(1) > .clear").click()
    // Input field check
    cy.get(".filters > :nth-child(1) > input").click().type("fake")
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "1071FAKELEI")
    // Clear "Search TS" filter
    cy.get(":nth-child(1) > .clear").click()
    // Update "Calendar Year" drop-down and "LEI" input field and check they were updated
    cy.get(".filters > :nth-child(2) > input").click().type("Calendar Year")
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).click()
    // Clear "Search column" filter
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Update "Calendar Year drop-down menu and "LEI" input field
    cy.id("Calendar Year").select("2020")
    cy.id("Legal Entity Identifier (LEI)").clear().type("1071FAKELEIUPDATED")
    // Click "Update Row" button
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Check "Calendar Year" drop-down was updated
    cy.get(".filters > :nth-child(1) > input").click().type("2020")
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "2020")
    // Clear "Search TS" filter
    cy.get(":nth-child(1) > .clear").click()
    // Check "LEI" input field was updated
    cy.get(".filters > :nth-child(1) > input")
      .click()
      .type("1071FAKELEIUPDATED")
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "1071FAKELEIUPDATED")
    // Click a row to have "Delete Row" button appear
    cy.get(
      ".row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).click()
    // Delete TS Record
    cy.get("#parsed-row > .action-wrapper > .row-actions > .delete-row").click()
    // Checks Cypress confirm message on "Delete Row" button
    cy.on("window:confirm", text => {
      expect(text).to.contains("Are you sure you want to delete this row?")
    })
    // Checks that TS doesn't have any records
    cy.get("#saved-ts > .no-records").should("have.text", "No Records Saved")
  })

  it("LAR Record tests: functionality with drop-downs, input fields, buttons, update LAR record and delete LAR record", () => {
    cy.visit(urlForTesting)
    // Generate TS - TS is required to be able to generate LAR records
    cy.id("Calendar Year").select("2019")
    cy.id("Legal Entity Identifier (LEI)").type("1071FAKELEI")
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Generate LAR record - with drop-down, input field and button entries
    // Input field
    cy.id("Loan Amount").type("110500")
    // Drop-down
    cy.id("State").select("WA - Washington")
    // Zip Code enums -> click "NA" button option
    cy.get(
      ":nth-child(16) > .fieldValue > .enum-entry > .enums > :nth-child(1)"
    ).click()
    // Save LAR Record
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Look up and check that "Loan Amount", "State" and "Zip Code" entries were saved in LAR record
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("Loan Amount")
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "110500")
    // Clear "Filter column" functionality
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Search for "State" column
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("State")
    // Check "State" column contains "WA"
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "WA")
    // Clear "Filter column" functionality
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Search for "Zip Code" column
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("Zip Code")
    // Check "Zip Code" column contains "NA"
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "NA")
    // click LAR record - allow cypress to work on updating record
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).click()
    // Update "Zip Code" to "Exempt" by clicking second button
    cy.get(
      "tr.highlight > .fieldValue > .enum-entry > .enums > :nth-child(2)"
    ).click()
    // Update "State" to "NY"
    cy.id("State").select("NY - New York")
    // Update "Loan Amount" to "110501"
    cy.id("Loan Amount").clear().type("110501")
    // Update LAR Record
    cy.get("#parsed-row > .action-wrapper > .row-actions > .save-row").click()
    // Clear "Filter column" functionality
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Look up and check that "Loan Amount", "State" and "Zip Code" entries were saved in LAR record
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("Loan Amount")
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "110501")
    // Clear "Filter column" functionality
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Search for "State" column
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("State")
    // Check "State" column contains "NY"
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "NY")
    // Clear "Filter column" functionality
    cy.get(".filters > :nth-child(2) > .clear").click()
    // Search for "Zip Code" column
    cy.get("#saved-lars > h3.clickable > .filters > :nth-child(2) > input")
      .click()
      .type("Zip Code")
    // Check "Zip Code" column contains "Exempt"
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).should("have.text", "Exempt")
    // Click on LAR Record to have "Delete Row" button appear
    cy.get(
      "#saved-lars > :nth-child(2) > .react-fluid-table > .react-fluid-table-container > :nth-child(2) > .react-fluid-table-row > .row-container > [style='width: 200px; min-width: 200px;'] > .custom-cell-content"
    ).click()
    // Delete LAR Record
    cy.get("#parsed-row > .action-wrapper > .row-actions > .delete-row").click()
    // LAR should have no records
    cy.get(".no-records").should("have.text", "No Records Saved")
  })
})
