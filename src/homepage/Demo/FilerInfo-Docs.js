import { Link } from "react-router-dom"
import { ExternalLink } from "../../common/ExternalLink"

export const Documentation = () => {
    return (
        <>
<li className="usa-card">
    <div className="usa-card__container">
        <div className="colorBanner"></div>
        <div className="usa-card__header">
            <h2 className="usa-card__heading">Filing Documentation</h2>
        </div>
        <div className="usa-card__body">
            <p>
            Answers to common questions about the process of filing HMDA data.
            </p>
            <ul className="usa-list">
                <li>
                    <Link to="documentation/2022/filing-faq/">HMDA Filing FAQ</Link>
                </li>
                <li>
                    <Link to="/documentation/2022/identifiers-faq/">
                    HMDA Institution Identifiers FAQ
                    </Link>
                </li>
                <li>
                    <Link to="/documentation/2022/data-collection-timelines/">
                    Annual HMDA Data Collection Timelines
                    </Link>
                </li>
                <li>
                    <Link to="/documentation/2022/quarterly-filing-dates/">
                    Quarterly HMDA Data Collection Timelines
                    </Link>
                </li>
                <li>
                    <ExternalLink url="https://hmdahelp.consumerfinance.gov/knowledgebase/s/topic/0TOt0000000PFzGGAW/hmda-articles">
                    HMDA Operations Knowledge Base
                    </ExternalLink>
                </li>
                <li>
                    <ExternalLink url="https://cfpb.github.io/hmda-platform">
                    HMDA API Documentation
                    </ExternalLink>
                </li>
            </ul>
        </div>
        <div className="usa-card__footer">
            <a href="/documentation/2023/" className="usa-button">View Documentation</a>
        </div>
    </div>
</li>
        
        
        
        
        
        </>
    )
}