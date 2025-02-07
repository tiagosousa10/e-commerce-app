import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import {IconButton, Box, Typography, Button, Tabs, Tab} from "@mui/material"
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import {shades} from "../../theme"
import {addToCart} from '../../state'
import {useParams} from "react-router-dom"
import Item from "../../components/Item"


const ItemDetails = () => {
  const dispatch = useDispatch()
  const {itemId} = useParams()
  const [value,setValue] = useState("description")
  const [count,setCount] = useState(1)
  const [item,setItem] = useState(null)
  const [items,setItems] = useState([])

  const handleChange = (event, newValue)=> {
    setValue(newValue)
  }

  //single item
  async function getItem() {
    const item  = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`, // fetching the items from the api strapi and grab image
      {method: "GET"}
    )
    const itemJson = await item.json()
    setItem(itemJson.data)
  }

  //all items
  async function getItems() {
    const items = await fetch(
       "http://localhost:1337/api/items?populate=image", // fetching the items from the api strapi
       {
          method: "GET",
       }
    )
    const itemsJson = await items.json()
    setItems(itemsJson.data)
 }

  return (
    <div>ItemDetails</div>
  )
}

export default ItemDetails
