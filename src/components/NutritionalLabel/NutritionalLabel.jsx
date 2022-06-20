import * as React from "react"
import { nutritionFacts } from "../../constants"
import "./NutritionalLabel.css"

export function NutritionalLabel(props) {

  if (props.currentItem === undefined || props.currentItem.length === 0)
    return null

  return (
      <div className="nutritional-label">
        <h3 className="title">Nutrition Facts</h3>

        <h4 className="item-name">{props.currentItem.item_name}</h4>

        <ul className="fact-list">{nutritionFacts.map((fact, index) => {
          return <NutritionalLabelFact keys={index} label={fact.label} value={props.currentItem[fact.attribute]} />
          })}
        </ul>
      </div>
  )
}


export function NutritionalLabelFact(props) {
  return (
    <li className="nutrition-fact">
      <span className="fact-label">{props.label}</span>{" "}
      <span className="fact-value">{props.value}</span>
    </li>
  )
}

export default NutritionalLabel
