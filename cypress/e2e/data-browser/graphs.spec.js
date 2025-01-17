import { isCI, isProd, isBeta } from "../../support/helpers"

const { HOST, ENVIRONMENT } = Cypress.env()

let baseURLToVisit = isCI(ENVIRONMENT) ? "http://localhost:3000" : HOST

if (isBeta(HOST)) {
  describe('HMDA Graphs', () => {
    it('API does not run in Beta', () => null)
  })
} else {
  describe('General Tests', () => {
    it('Checks <GraphsHeader/> component if overview props was not sent to the component', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`).contains(
        'The following graphs present data for the financial institutions reporting HMDA quarterly data.'
      )
    })

    it('Checks <GraphsHeader/> component if data from API succeedes then it checks if numbered financial institutions show in the header', () => {
      // In Dev only an alphanumeric approximation is provided (ex. 5x).
      // In Prod we want to ensure that the count is numeric.
      let institutionCountRx = isProd(HOST) ? '[0-9]{1,3}' : '[0-9x]{1,3}'
      const financialInstitutionsRx = new RegExp(
        ` ${institutionCountRx} financial institutions`
      )

      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(1000)
      cy.get('.heading > :nth-child(2)').contains(financialInstitutionsRx)
    })

    it('Share Graph button tooltip displays after clicking the button', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(2000)
      cy.get('.CopyURLButton').click({ force: true })
      cy.get('.CopyURLButton .tooltiptext')
    })
  })

  describe('Tests user interaction with tabs', () => {
    it('Starts on Graph tab and then switches to filer tab', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(1000)
      cy.get('[aria-label="Navigate to the Filer Info tab."]').click(0, 0, {
        force: true,
      })
      cy.url().should(
        'eq',
        `${baseURLToVisit}/data-browser/graphs/quarterly/info/filers`
      )
    })

    it('Starts on Graph tab and then switches to faq tab', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.get('[aria-label="Navigate to the FAQ tab."]').click(0, 0, {
        force: true,
      })
      cy.url().should(
        'eq',
        `${baseURLToVisit}/data-browser/graphs/quarterly/info/faq`
      )
    })
  })

  describe('Graph Specific tests', () => {
    it('Visits graph page and checks that the url contains correct query parameters', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(2000)
      // Regex check graphName, periodLow, periodHigh and visibleSeries in the url
      cy.url().should('match', /quarterly\/([a-z]{2,}-?)+/)
      cy.url().should('match', /periodLow=20\d{2}-Q\d/)
      cy.url().should('match', /periodHigh=20\d{2}-Q\d/)
      cy.url().should(
        'match',
        /visibleSeries=([a-zA-Z-\/]+(%20)?[a-zA-Z-]*,?)+/
      )
    })

    it('Visit graph page then selects a graph from the dropdown menu', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(1000)

      cy.url().then(url => {
        cy.get('.react-select__graph__value-container').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-2-option-0-0').click(0, 0, { force: true })
        cy.url().should('not.eq', url)
      })
    })

    it("Visits graphs page, change periods, checks that the url updates with selected periods, clicks 'Show All Quarters' button and checks url updated with default periods", () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(2000)

      cy.url().then(url => {
        cy.log(url)
        cy.get('.react-select__period_start__value-container').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-3-option-3').click(0, 0, { force: true })
        // Check url doesn't include base graph url start quarter
        cy.url().should('not.eq', url)

        cy.get('.react-select__period_end__value-container').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-4-option-6').click(0, 0, { force: true })
        // Check URL doesn't include base graph url end quarter
        cy.url().should('not.eq', url)
        // Checks url was reset to base graph url which includes start and end quarters
        cy.get('.reset').click(0, 0, { force: true })
        cy.url().should('eq', url)
      })
    })

    it('De-select and re-select a series, UI and URL updates', () => {
      // let urlUpdate
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      // De-select 'Conventional Conforming' from series
      cy.get('.highcharts-color-0 > text').click(0, 0, { force: true })
      cy.url().should('not.contain', 'Conventional%20Conforming')
      // Re-select 'Conventional Conforming' from series
      cy.get('.highcharts-color-0 > text').click(0, 0, { force: true })
      cy.url().should('include', 'Conventional%20Conforming')
    })

    it("URL loads with specific set of series and it's reflected in the UI", () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(2000)

      cy.url().then(url => {
        cy.log(url)
        cy.visit(
          `${baseURLToVisit}/data-browser/graphs/quarterly/applications?periodLow=2018-Q1&periodHigh=2021-Q4&visibleSeries=FHA,HELOC,VA`
        )
        cy.wait(1000)
        cy.url().should('not.eq', url)
      })
    })
  })
}
