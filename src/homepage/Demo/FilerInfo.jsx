import { Filing } from "./FilerInfo-Filing";
import { Documentation } from "./FilerInfo-Docs";
import { Guides } from "./FilerInfo-Guides";
import iconSprite from "../../common/uswds/img/sprite.svg";




export const FilerInfo = () => {
    return (
      <>
<h3>
  <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
    <use href={`${iconSprite}#account_balance`}></use>
  </svg> Filer Info
</h3>
<ul className="usa-card-group">
      <Filing />
      <Documentation />
      <Guides />
</ul>
      </>
    )
}