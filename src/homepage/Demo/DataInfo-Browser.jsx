export const Browser = () => {
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
            <ul>
                <li><a>Graphs</a></li>
                <li><a>Maps</a></li>
                <li><a>Dataset Filtering and Summary Tables</a></li>
            </ul>
        </div>
        <div className="usa-card__footer">
            <a href="/data-browser/" className="usa-button">Explore HMDA Data</a>
        </div>
    </div>
</li>

</>
    )
}