import styled from '@emotion/styled'
import { Theme } from '@chakra-ui/react'

// Create a typed version of styled for our theme
const styledWithTheme = styled as typeof styled

export default styledWithTheme