import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import {setItems} from '../../state'

const ShoppingList = () => {
   const dispatch  = useDispatch() // dispatching the action
   const [value, setValue] = useState("all")
   const items = useSelector((state) => state.cart.items) // grabbing the items from the state
   console.log("🚀 ~ ShoppingList ~ items:", items)
   const isNonMobile = useMediaQuery("(min-width:600px)") // check if screen is greater than 600px

   const handleChange = (event, newValue) => {
      setValue(newValue);
   }

   async function getItems() {
      const items = await fetch(
         "http://localhost:1337/api/items?populate=image", // fetching the items from the api strapi
         {
            method: "GET",
         }
      )
      const itemsJson = await items.json()
      dispatch(setItems(itemsJson.data))
   }

   useEffect(() => {
      getItems()
   }, []) // eslint-disable-line react-hooks/exhaustive-deps


   const topRatedItems = items.filter(
      (item) => item.attributes.category === "topRated"
   )

   const newArrivalsItems = items.filter(
      (item) => item.attributes.category === "newArrivals"
   )

   const bestSellersItems = items.filter(
      (item) => item.attributes.category === "bestSellers"
   )


  return (
    <Box
      width={"80%"}
      margin={"80px auto"}
    >
      <Typography variant='h3' textAlign={"center"}>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: {display: isNonMobile ? "block" : "none"}}}
        sx={{
         m:"25px",
         "& .MuiTabs-flexContainer": {
            flexWrap: "wrap"
         }
        }}
      >


      </Tabs>

    </Box>
  )
}

export default ShoppingList
