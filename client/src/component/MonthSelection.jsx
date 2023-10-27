import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {FormGroup,Typography,Button,styled} from '@mui/material';

const Container = styled(FormGroup)`
display:flex;
width:20%;
min-width:100px;
padding:2%;
border:1px solid red;
background:#dc5e5e66;
border-radius:20px;
margin:5% auto;
& > p {
  justify-content:center;
  text-align:center;
  font-size:20px;
}`;
const MonthSelection = () => {
  const { year } = useParams();
  const navigate = useNavigate();

  const handleMonthSelection = (month) => {
    navigate(`/admin/${year}/${month}`);
  };

  return (
    <Container>
      <Typography>Select Month</Typography>
      <Button onClick={() => handleMonthSelection("January")}>January</Button>
      <Button onClick={() => handleMonthSelection("February")}>February</Button>
      <Button onClick={() => handleMonthSelection("March")}>March</Button>
      <Button onClick={() => handleMonthSelection("April")}>April</Button>
      <Button onClick={() => handleMonthSelection("May")}>May</Button>
      <Button onClick={() => handleMonthSelection("June")}>June</Button>
      <Button onClick={() => handleMonthSelection("July")}>July</Button>
      <Button onClick={() => handleMonthSelection("August")}>August</Button>
      <Button onClick={() => handleMonthSelection("September")}>September</Button>
      <Button onClick={() => handleMonthSelection("Octuber")}>Octuber</Button>
      <Button onClick={() => handleMonthSelection("November")}>November</Button>
      <Button onClick={() => handleMonthSelection("December")}>December</Button>
    </Container>
  );
};

export default MonthSelection;
