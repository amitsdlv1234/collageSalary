import React from 'react'
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
const Navbar=styled(Box)`
display:flex;
justify-content:center;
height:7vh;
width:100%;
background-color:rgb(179, 60, 0);
`;
const Cardtab=styled(Box)`
display:flex;
margin-top:10%;
text-align:center;
& > div {
    display:flex;
    margin:auto;
    height:30vh;
    width:20vw;
    background-color: rgb(167 77 77 / 50%);
    border-radius:10px;
    border:1px solid black;
    &:hover {
      background-color: rgb(167 77 77 / 70%); /* Change background color on hover */
    }
`;
  
const StaffDash = () => {
  const {month,year,id}=useParams();
  const navigate=useNavigate();
  return (
    <>
    <Navbar><Typography variant='h5'margin={'auto'}>Staff Dashboard</Typography></Navbar>
    <Cardtab>
    <Box onClick={()=>navigate(`/staffSalary/staffDash/${id}`)}>
      <Typography variant='h4'margin={'auto'}>Staff Salary Data</Typography>
    </Box>
    {/* <Box onClick={()=>navigate(`/searchStaff/admin/${year}/${month}`)}>
    <Typography variant='h4'margin={'auto'}>Staff Profile</Typography>
    </Box> */}
    </Cardtab>
    </>
  )
}

export default StaffDash;
