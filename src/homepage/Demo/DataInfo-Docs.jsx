import { Link } from 'react-router-dom';
import NewIndicator from '../NewIndicator';


export const DataDocs = () => {
    return (
<>
<li className="usa-card">
    <div className="usa-card__container">
        <div className="colorBanner"></div>
        <div className="usa-card__header">
            <h2 className="usa-card__heading">Data Documentation</h2>
        </div>
        <div className="usa-card__body">
            <p>
                Answers to common questions about working with HMDA datasets and Data Browser tools.
            </p>
            <ul className="usa-list">
                <li>
                    <a
                    href='https://files.consumerfinance.gov/f/documents/cfpb_beginners-guide-accessing-using-hmda-data_guide_2022-06.pdf'
                    download={true}
                    >
                    A Beginner's Guide to HMDA Data
                    <NewIndicator />
                    </a>
                </li>
                <li>
                    <Link to='/documentation/2022/data-browser-graphs-faq/'>
                    Data Browser - Graphs FAQ
                    <NewIndicator />
                    </Link>
                </li>
                <li>
                    <Link to='/documentation/2022/maps-faq/'>
                    Data Browser - Maps FAQ
                    </Link>
                </li>
                <li>
                    <Link to='/documentation/2022/data-browser-faq/'>
                    Data Browser - Dataset Filtering FAQ
                    </Link>
                </li>
                <li>
                    <Link to='/documentation/2022/static-dataset-faq/'>
                    Data Publication - Static Dataset FAQ
                    </Link>
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