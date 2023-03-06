export const Publications = () => {
    return (
<>
<li className="usa-card">
    <div className="usa-card__container">
        <div className="colorBanner"></div>
        <div className="usa-card__header">
            <h2 className="usa-card__heading">HMDA Data Browser</h2>
        </div>
        <div className="usa-card__body">
            <p>
                A suite of tools that allows users to filter, summarize, download, and visualize HMDA datasets.
            </p>
            <ul className="usa-list">
                <li>Static Datasets
                    <ul>
                        <li><a>Snapshot National Loan-Level Dataset</a></li>
                        <li><a>One Year National Loan-Level Dataset</a></li>
                        <li><a>Three Year National Loan-Level Dataset</a></li>
                    </ul>
                </li>
                <li>Dynamic Datasets
                    <ul>
                        <li><a>Modified LAR</a></li>
                        <li><a>Dynamic National Loan-Level Dataset</a></li>
                    </ul>
                </li>
                <li>Reports
                    <ul>
                        <li><a>Disclosure Reports</a></li>
                        <li><a>MSA/MD Aggregate Reports</a></li>
                        <li><a>National Aggregate Reports</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className="usa-card__footer">
            <a href="/data-publication/2021" className="usa-button">See Publications</a>
        </div>
    </div>
</li>
</>
    )
}