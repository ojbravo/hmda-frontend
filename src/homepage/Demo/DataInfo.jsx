import { Browser } from "./DataInfo-Browser"
import { DataDocs } from "./DataInfo-Docs"
import { Updates } from "./DataInfo-Updates"
import { Publications } from "./DataInfo-Publications"
import { Research } from "./DataInfo-Research"
import iconSprite from "../../common/uswds/img/sprite.svg"



export const DataInfo = () => {
    return (
        <>
        <h3 class="alt">
            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
                <use href={`${iconSprite}#insights`}></use>
            </svg> Data Info
        </h3>
        <ul className="usa-card-group">
            <Browser />
            <DataDocs />
            <Updates />
            <Publications />
            <Research />
        </ul>
        </>
    )
}