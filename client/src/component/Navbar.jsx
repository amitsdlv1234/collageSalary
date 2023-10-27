import React from 'react'
import {Box, Typography, styled} from '@mui/material'
const Header = styled(Box)`
display:flex;
justify-content:center;
text-align:center;
height:7vh;
width:100%;
background-color:rgb(179, 60, 0);
        `;
function Navbar() {
  return (
    <Header><Typography variant='h5'margin={'auto'} >Admin DashBoard</Typography></Header>
  )
}

export default Navbar
