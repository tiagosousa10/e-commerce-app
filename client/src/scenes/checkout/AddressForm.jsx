import {Box, useMediaQuery, TextField } from "@mui/material"
import { getIn } from "formik"

const AddressForm = ({
   type,
   value,
   errors,
   touched,
   handleBlur,
   handleChange,    
}) => {
   const isNonMobile = useMediaQuery("(min-width:600px)")

   //these functions allow for better code readability
   const formattedName = (field) => `${type}.${field}`; // type.billingAddress.street

   const formattedError = (field) => 
      Boolean(
         getIn(touched, formattedName(field)) &&  // check if the field has been touched
         getIn(errors, formattedName(field))
      ); // if it has, return the error message

   const formattedHelper = (field) =>
      getIn(touched, formattedName(field)) &&  // check if the field has been touched
      getIn(errors, formattedName(field))


  return (
    <Box
      display={"grid"}
      gap={"15px"}
      gridTemplateColumns="repeat(4,minmax(0,1fr))"
      sx={{
         "& > div" : {gridColumn: isNonMobile ? undefined : "span 4"},
      }}
    ></Box>
  )
}

export default AddressForm
