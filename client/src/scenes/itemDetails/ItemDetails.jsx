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

 useEffect(() => {
  getItem()
  getItems()
 }, [itemId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      width={"80%"}
      margin={"80% auto"}
    >
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        columnGap={"40px"}
      >
        {/*IMAGES */}
        <Box flex={"1 1 40%"} mb={"40px"}>
          <img
            alt={item?.name}
            width={"100%"}
            height={"100%"}
            src={`http://localhost:1337${item?.attributes?.image?.data?.formats?.medium?.url}`}
            style={{objectFit: "contain"}}
          />
        </Box>

        {/*ACTIONS */}
        <Box flex={"1 1 50%"} mb={"40px"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>Home / Item</Box>
            <Box>Prev Next</Box>
          </Box>
          
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.title}</Typography>
            <Typography>${item?.attributes.price}</Typography>
            <Typography sx={{mt:"20px"}}>{item?.attributes.shortDescription}</Typography>
          </Box>

          <Box display={"flex"} alignItems={"center"} minHeight={"50px"}>
            <Box display={"flex"} alignItems={"center"} border={`1.5px solid ${shades.neutral[300]}`} mr={"20px"} p={"2px 5px"}> 
            <IconButton
                        onClick={() => setCount(Math.max(count - 1, 1))}
                     >
                        <RemoveIcon />
                     </IconButton>
                     <Typography color={shades.primary[300]}>{count}</Typography>
                     <IconButton
                        onClick={() => setCount(Math.max(count +1))}
                     >
                        <AddIcon />
                     </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default ItemDetails
