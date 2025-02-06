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
      if(itemsJson) {
         dispatch(setItems(itemsJson.data))
         console.log("🚀 ~ getItems ~ itemsJson:", itemsJson)
      } else {
         console.log("No items found")
      }
   }

   useEffect(() => {
      getItems()
   }, []) // eslint-disable-line react-hooks/exhaustive-deps


   const topRatedItems = items.filter(
      (item) => item.category === "topRated"
    );
    const newArrivalsItems = items.filter(
      (item) => item.category === "newArrivals"
    );
    const bestSellersItems = items.filter(
      (item) => item.category === "bestSellers"
    );


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
         <Tab label="ALL" value="all" />
         <Tab label="NEW ARRIVALS" value="newArrivals" />
         <Tab label="BEST SELLERS" value="bestSellers" />
         <Tab label="TOP RATED" value="topRated" />

      </Tabs>
        <Box
         margin="0 auto"
         display={"grid"}
         gridTemplateColumns={"repeat(auto-fill, 300px)"}
         justifyContent={"space-around"}
         rowGap="20px"
         columnGap="1.33%"
        >
         {value === "all" && items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}   />
         ))}
         {value === "newArrivals" && newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}   />
         ))}
         {value === "bestSellers" && bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}   />
         ))}
         {value === "topRated" && topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`}   />
         ))}
        </Box>
    </Box>
  )
}

export default ShoppingList
