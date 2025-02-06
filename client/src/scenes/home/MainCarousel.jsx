import {Box, Typography, IconButton, useMediaQuery} from "@mui/material"
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" 
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import {shades} from "../../theme"

//import all images from assets folder
const importAll = (r) => {
  r.keys().reduce((acc,item) => {
    acc[item.replace("./", "")] = r(item) // acc[item] = r(item)
    return acc 
  }, {})
}

const heroTextureImports = importAll( // import all images
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/) // match all image files
)


const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)") // check if screen is greater than 600px  
  
   return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top:"50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon  sx={{fontSize: 40}} />
        </IconButton>
      )}
    >

    </Carousel>
  )
}

export default MainCarousel
