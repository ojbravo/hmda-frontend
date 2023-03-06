import { Link } from "react-router-dom"
import { LATEST_FIG_YEAR } from '../../common/constants/years'
import { ExternalLink } from "../../common/ExternalLink"
import NewIndicator from '../NewIndicator'


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
  
export const Guides = () => {
    return (
        <>
<li className="usa-card">
    <div className="usa-card__container">
        <div className="colorBanner"></div>
        <div className="usa-card__header">
            <h2 className="usa-card__heading">Guides for Filers</h2>
        </div>
        <div className="usa-card__body">
            <p>
            Published resources to help guide financial institutions through the processes of submitting HMDA data.
            </p>
            <ul className="usa-list">
                <li>
                <Link to={`/documentation/${LATEST_FIG_YEAR}/fig/`}>Filing Instructions Guides</Link>
            </li>
            <ul>
                <li>
                <a
                    href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/${LATEST_FIG_YEAR}-hmda-fig.pdf`}
                    download={true}
                >
                    For data collected in {LATEST_FIG_YEAR}
                    <NewIndicator/>
                    <FigLastUpdated year={LATEST_FIG_YEAR} />
                </a>
                </li>
                <li>
                <a
                    href={`https://s3.amazonaws.com/cfpb-hmda-public/prod/help/supplemental-guide-for-quarterly-filers-for-${LATEST_FIG_YEAR}.pdf`}
                    download={true}
                >
                    Supplemental Guide for Quarterly Filers for {LATEST_FIG_YEAR}
                    <NewIndicator/>
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
        </div>
        <div className="usa-card__footer">
            <button type="button" className="usa-button">View Guides</button>
        </div>
    </div>
</li>
        
        
        
        
        
        </>
    )
}