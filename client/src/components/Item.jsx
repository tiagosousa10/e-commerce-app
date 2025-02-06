import { useState } from "react";
import {useDispath} from "react-redux"
import {IconButton, Box, Typography, useTheme, Button} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import {shades} from "../../theme"
import {addToCart} from '../../state'
import {useNavigate} from "react-router-dom"


const Item = ({item, width}) => {
   const navigate = useNavigate()
   const dispatch = useDispath()
   const [count,setCount] = useState(1) // starting the count at 1
   const [isHovered, setIsHovered] = useState(false) 
   const {
      palette: {neutral}
   } = useTheme()

   const {category, price , name , image} = item.attributes; // from strapi
   const {
      data: {
         attributes: {
            formats: {
               medium: {url} // -> src img from strapi
            }
         }
      }
   } = image; // from strapi

   return (
      <Box width={width}>
         <Box 
            position={"relative"} 
            onMouseOver={() => setIsHovered(true)} 
            onMouseOut={() => setIsHovered(false)}
         >
            <img 
               alt={item.name}
               width={"300px"}
               height={"400px"}
               src={`http://localhost:1337${url}`}
               onClick={() => navigate(`/item/${item.id}`)}
               style={{cursor: "pointer"}}
            />
         </Box>
      </Box>
   )
}


export default Item;
