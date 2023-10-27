import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FormGroup, Typography ,FormControl,InputLabel,Input, Button} from "@mui/material";
import styled from "@emotion/styled";


const Container=styled(FormGroup)`
display:flex;
width:30%;
padding:5%;
border:1px solid red;
background:#dc5e5e66;
border-radius:20px;
margin:5% auto;
& > p {
  justify-content:center;
  text-align:center;
}`;

const YearSelection = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState({Year:''});

  const onValueChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }
  console.log(user.Year);
  const handleYearSelection = () => {
    navigate(`/months/${user.Year}`);
  };

  return (
    <div>
      <Navbar/>
      <Container>
        <Typography>Year</Typography>
      <FormControl ><InputLabel>Year</InputLabel>
        <Input onChange={(e)=>onValueChange(e)}value={user.Year} name="Year"></Input>
        </FormControl>
        <Button onClick={handleYearSelection}>Click</Button>
        </Container>
    </div>
  );
};

export default YearSelection;
