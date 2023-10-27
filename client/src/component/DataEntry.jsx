import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormGroup, Input, InputLabel, Typography} from '@mui/material';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { addUser } from '../service/api';


const Container=styled(FormGroup)`
margin:10px;
padding:10px;
text-align: center;
border:1px solid black;
`;
                                   
                                   
const Employee=styled(FormGroup)  `
display:flex;
flex-direction:row;
border:1px solid black;
margin:10px;
padding:10px;
& > div ,lebel{
   padding:10px;
   margin:auto;
}`;

const DataEntry = () => {
   const { year, month } = useParams();
   const navigate=useNavigate();
  const [staff, setStaff] = useState({
    ID: Number,
    Year:parseInt(year),
    Month:month,
    Name: String,
    Designation: String,
    PayScale: String,
    Level: Number,
    PayMatrix: Number,
    AdditionalIncrement: Number,
    HRA:Number,
    CCA: Number,
    EPF: Number,
    GSLI:Number,
    HouseRent:Number,
    WaterCharge:Number,
    Mobile: Number,
    TDS: Number,
    DA: 0,
    GrandTotal: 0,
    Total: 0,
    Amount: 0
  });

//   const [errors, setErrors] = useState({});


  const onValueChange = (e) => {
    const { name, value } = e.target;
    const numericValue = !isNaN(parseFloat(value)) ? parseFloat(value) : value;
  
    setStaff((prevStaff) => {
      const updatedStaff = {
        ...prevStaff,
        [name]: numericValue,
      };
  
      if (!isNaN(parseFloat(updatedStaff.PayMatrix))) {
        updatedStaff.DA = updatedStaff.PayMatrix * 0.38;
      }
  
      updatedStaff.GrandTotal =
        parseFloat(updatedStaff.PayMatrix) +
        updatedStaff.DA +
        parseFloat(updatedStaff.AdditionalIncrement) +
        parseFloat(updatedStaff.HRA) +
        parseFloat(updatedStaff.CCA);
      updatedStaff.Total =
        parseFloat(updatedStaff.EPF) +
        parseFloat(updatedStaff.GSLI) +
        parseFloat(updatedStaff.HouseRent) +
        parseFloat(updatedStaff.WaterCharge) +
        parseFloat(updatedStaff.Mobile) +
        parseFloat(updatedStaff.TDS);
      updatedStaff.Amount =
        updatedStaff.GrandTotal - updatedStaff.Total;
  
      return updatedStaff;
    });

   //  // Validate required fields
   //  setErrors((prevErrors) => ({
   //    ...prevErrors,
   //    [name]: value ? '' : 'This field is required',
   //  }));
  };
  
  
const viewDetails = async () => {
   // Validate required fields before submitting
  if (!staff.ID) {
   alert('ID is required.');
   // If ID is not provided, show an error message or handle it as needed
   console.error('ID is required.');
   return;
 }
// Check if all other required fields are filled
const requiredFields = ['ID', 
'Name' ,
'Designation',
'PayScale' ,
'Level'   ,
'GrandTotal', 
'Total' ,
'Amount' ];
const missingFields = requiredFields.filter(field => !staff[field]);

if (missingFields.length > 0) {
  // If any required field is missing, show an error message or handle it as needed
  console.error(`Fields ${missingFields.join(', ')} are required.`);
  alert(`Fields ${missingFields.join(', ')} are required.`);
  return;
}

   // If all required fields are provided, proceed to call the API
 try {
   console.log({ year,month,data: staff});
        await addUser(year,month,staff);
   // console.log('Staff added successfully:',{ year,month,data: staff});
   // Optionally, navigate to another page after adding staff
   // navigate('/all');
      alert("Data Added successfully");
      // window.location.reload();
      navigate(`/all/admin/${year}/${month}`);
 } catch (error) {
   console.error('Error adding staff:', error);
   alert("Staff Data is Already Exist OR Fill all Fields :- Refresh the Page and Fill again ");
 }
};
  return (
    <div>
      <h2>Data Entry for {month.charAt(0).toUpperCase() + month.slice(1)}, {year}</h2>
      <Container>
        <Typography variant='h4' margin={'10px'}>Add Staff</Typography>
         <Typography variant='h6'>Staff Details</Typography>
     <Employee >
      <FormControl ><InputLabel>Mobile No.</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="ID"></Input>
        </FormControl>
        <FormControl><InputLabel>Name</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="Name"></Input>
        </FormControl>
        <FormControl><InputLabel>Designation</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="Designation"></Input>
        </FormControl>
            <FormControl><InputLabel>PayScale(in words)</InputLabel>
        <Input type='text' onChange={(e)=>onValueChange(e)} name="PayScale"></Input>
        </FormControl>
        <FormControl><InputLabel>Level</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="Level"></Input>
        </FormControl>
     </Employee>
      <Typography variant='h6'>EMOLUMENT</Typography>
     <Employee>
     <FormControl>
        <InputLabel>PayMatrix</InputLabel>
        <Input   onChange={(e)=>onValueChange(e)}  name="PayMatrix" ></Input>
     </FormControl>
     <FormControl>
        <InputLabel>DA</InputLabel>
        <Input   disabled value={staff.DA}></Input>
     </FormControl>
     <FormControl>
        <InputLabel>AdditionalIncrement</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="AdditionalIncrement"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>HRA</InputLabel>
        <Input  onChange={(e)=>onValueChange(e)} name ="HRA" ></Input>
     </FormControl>
     <FormControl>
        <InputLabel>CCA</InputLabel>
        <Input  onChange={(e)=>onValueChange(e)} name ="CCA"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>GrandTotal</InputLabel>
        <Input  disabled value={staff.GrandTotal}></Input>
     </FormControl>
     </Employee>
     <Typography variant='h6'>DEDUCTION</Typography>
     <Employee>
     <FormControl>
        <InputLabel>EPF</InputLabel>
        <Input  onChange={(e)=>onValueChange(e)} name="EPF"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>GSLI</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="GSLI"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>HouseRent</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="HouseRent"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>WaterCharge</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="WaterCharge"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>Mobile</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="Mobile"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>ElectricCharge</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="ElectricCharge"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>TDS</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name ="TDS"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>Total</InputLabel>
        <Input disabled value={staff.Total}></Input>
     </FormControl>
     </Employee>
     <FormControl style={{width:'30%', margin:"10px auto"}}>
        <InputLabel>Amount</InputLabel>
        <Input disabled value={staff.Amount}></Input>
     </FormControl>
     <FormControl style={{width:'30%', margin:"auto"}}>
        <Button variant='contained' onClick={()=>{viewDetails()}}>Add Staff</Button>
     </FormControl>
    </Container>
    </div>
  );
};

export default DataEntry;
