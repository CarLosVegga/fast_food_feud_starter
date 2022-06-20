import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header.jsx"
import Instructions from "./components/Instructions/Instructions.jsx"
import Chip from './components/Chip/Chip.jsx'
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel.jsx"
import { useState } from "react"
import { createDataSet } from "./data/dataset"
import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  const [categoryStatus, setCategory] = useState('')
  const [restaurantStatus, setRestaurant] = useState('')
  const [itemStatus, setItem] = useState('')

  function handleCategoriesClick(category) {
    setCategory(category)
  }

  function handleRestaurantsClick(restaurant) {
    setRestaurant(restaurant)
  }

  function handleItemClick(item) {
    setItem(item)
  }

  function handleFactClick(item){
    setFact(item)
  }

  function checkMenuItems(item){
    if (categoryStatus === '' || restaurantStatus === '')
      return null
    else 
      return item.food_category == categoryStatus && item.restaurant == restaurantStatus
  }

  const currentMenuItems = data.filter(checkMenuItems)
  let currentItem =  currentMenuItems.find((item => item.item_name === itemStatus))
  console.log(currentItem)

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category, index) => {
            return <Chip setters={handleCategoriesClick} isActive={(categoryStatus===category?true:false)} label={category} key={category}/>
          })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header 
          title = {appInfo.title} 
          tagline = {appInfo.tagline}
          description = {appInfo.description}
        />
        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            {restaurants.map((restaurant, index) => {
              return <Chip setters={handleRestaurantsClick} isActive={(restaurantStatus===restaurant?true:false)} label={restaurant} key={restaurant}>{restaurant}</Chip>
            })}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
          <Instructions 
            instructions = {appInfo.instructions.start}
          />
        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */}
            {currentMenuItems.map((item, index) =>  {
              return <Chip setters = {handleItemClick} isActive={(itemStatus===item.item_name?true:false)} label={item.item_name} key={index}>{item.item_name} </Chip>
            })}
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {/* YOUR CODE HERE */}
            {console.log(currentItem)}
            <NutritionalLabel currentItem = {currentItem} />
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
