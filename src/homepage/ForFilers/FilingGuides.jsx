import { Link } from 'react-router-dom'
import { CURRENT_YEAR } from '../../common/constants/years'
import { ExternalLink } from '../../common/ExternalLink'
import { ExpandableCard } from '../ExpandableCard'

const figUpdates = {
  2021: '11/20/2020',
  2022: '10/20/2021',
}

export const FigLastUpdated = ({ year }) => {
  if (!figUpdates[year]) return null
  return (
    <span className='last-updated'>( Last updated: {figUpdates[year]})</span>
  )
}

export const FilingGuides = () => (
  <ExpandableCard
    id='home-expand-filing-guides'
    title='Guides for HMDA Filers'
    description='Published resources to help guide financial institutions through the processes of submitting HMDA data.'
  >
    <ul>
      <li>
        <Link to='/documentation/2022/fig/'>Filing Instructions Guides</Link>
      </li>
      <ul>
        <li>
          <a
            href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${CURRENT_YEAR}-hmda-fig.pdf`}
            download={true}
          >
            For data collected in {CURRENT_YEAR}
            <FigLastUpdated year={CURRENT_YEAR} />
          </a>
        </li>
        <li>
          <a
            href='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers-for-2022.pdf'
            download={true}
          >
            Supplemental Guide for Quarterly Filers for {CURRENT_YEAR}
          </a>
        </li>
        <li>
          <ExternalLink url='https://www.ffiec.gov/hmda/fileformats.htm'>
            For data collected in or before 2016
          </ExternalLink>
        </li>
      </ul>
      <li>
        <ExternalLink url='https://www.ffiec.gov/hmda/guide.htm'>
          A Guide to HMDA Reporting: Getting It Right
        </ExternalLink>
      </li>
      <li>
        <a
          href='https://s3.amazonaws.com/cfpb-hmda-public/prod/help/HMDA-Loan-Scenarios.pdf'
          download={true}
        >
          HMDA Loan Scenarios
        </a>
      </li>
      <li>
        <ExternalLink url='https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/hmda-reporting-requirements/'>
          HMDA Reporting Requirements
        </ExternalLink>
      </li>
    </ul>
  </ExpandableCard>
)