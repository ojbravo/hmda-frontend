export const Filing = () => {
    return (
<>
<li className="usa-card">
    <div className="usa-card__container">
        <div className="colorBanner"></div>
        <div className="usa-card__header">
            <h2 className="usa-card__heading">HMDA Filing Platform</h2>
        </div>
        <div className="usa-card__body">
            <p>
            The HMDA Filing Platform allows financial institutions to upload, review, certify, and submit HMDA data collected in or after 2017.
            </p>
            <ul className="usa-list">
            <li>
                <a href='/tools/rate-spread'>Rate Spread Calculator</a>
            </li>
            <li>
                <a href='/tools/check-digit'>Check Digit Generation/Validation</a>
            </li>
            <li>
                <a href='/tools/file-format-verification'>
                File Format Verification Tool
                </a>
            </li>
            <li>
                <a href='/tools/lar-formatting'>LAR Formatting Tool</a>
            </li>
            </ul>
        </div>
        <div className="usa-card__footer">
            <a href="filing/2023-Q1/" className="usa-button">Submit HMDA Data</a>
        </div>
    </div>
</li>


</>
    )
}