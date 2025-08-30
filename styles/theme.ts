import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: "360px",
  md: "768px", 
  lg: "1024px",
  xl: "1440px"
};

const customTheme = extendTheme({
  fonts: {
    body: "Mukta, sans-serif",
    heading: "Mukta, sans-serif",
    mono: "Mukta, sans-serif",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
    extrabold: 800
  },
  radii: {
    sm: '4px',
  },
  fontSizes: {
    '5xl': '40px',
    '6xl': '60px'
  },
  colors: {
    orange: {
      500: "#FBA442"
    }
  },
  breakpoints
})

export default customTheme