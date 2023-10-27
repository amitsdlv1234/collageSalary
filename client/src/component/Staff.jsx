import React,{useState} from 'react';
import { Button, FormControl, FormGroup, Input, InputLabel, Typography} from '@mui/material';
import styled from '@emotion/styled';
import { SearchStaff } from '../service/api';


const Container=styled(FormGroup)`
margin:5px;
padding:5px;
text-align: center;
border:1px solid black;
`;
                                   
                                   
const Employee=styled(FormGroup)  `
display:flex;
flex-direction:row;
border:1px solid black;
margin:5px;
padding:3px;
& > div ,lebel{
   padding:3px;
   margin:auto;
}`;

const DataEntry = () => {
   
  const [staff, setStaff] = useState({
    ID: Number,
    Year:Number,
    Month:String,
  });
  const onValueChange = (e) => {
    setStaff({...staff ,[e.target.name]:e.target.value});
    };
  
const viewDetails = async () => {
   // If all required fields are provided, proceed to call the API
//    await console.log(staff);
 try {
        await SearchStaff(staff);
 } catch (error) {
   console.error('Error adding staff:', error);
   alert("Staff Data is Already Exist OR Fill all Fields :- Refresh the Page and Fill again ");
 }
};
  return (
    <div>
      <Container>
        <Typography variant='h7' margin={'3px'}>Search Staff</Typography>
     <Employee >
      <FormControl ><InputLabel>Mobile No.</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="ID"></Input>
        </FormControl>
        <FormControl ><InputLabel>Year</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="Year"></Input>
        </FormControl>
        <FormControl><InputLabel>Month</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="Month"></Input>
        </FormControl>
        <FormControl style={{width:'20%', margin:"auto"}}>
        <Button variant='contained' onClick={()=>{viewDetails()}}>Search Staff</Button>
     </FormControl>
        </Employee>
    </Container>
    </div>
  );
  };

export default DataEntry;
