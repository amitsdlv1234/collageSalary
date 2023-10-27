import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, FormGroup, Input, InputLabel, Typography} from '@mui/material';
import styled from '@emotion/styled';
import { EditUser,getUser } from '../service/api';
// import axios from 'axios';
import { useParams } from 'react-router-dom';


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

const EditStaff = () => {
   const {id, year, month } = useParams();
   let navigate = useNavigate();
  const [staff, setStaff] = useState({
    ID: '',
    Name: '',
    Designation: '',
    PayScale:'',
    Level: '',
    PayMatrix:'',
    AdditionalIncrement:'',
    HRA:'',
    CCA: '',
    EPF: '',
    GSLI:'',
    HouseRent:'',
    WaterCharge:'',
    Mobile:'',
    ElectricCharge:'',
    TDS: '',
    DA: '',
    GrandTotal: '',
    Total: '',
    Amount: ''
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
  })};
  useEffect(() => {
   const loadUserDetails = async () => {
     try {
       const response = await getUser(id, month,year);
       if (response && response.data) {
         setStaff(response.data[0]);
         console.log(response.data);
       } else {
        //  console.error("Invalid API response:", response);
         // Handle or display an error message to the user
       }
     } catch (error) {
       console.error("Error loading user details:", error);
       // Handle or display an error message to the user
     }
   };

   loadUserDetails();
 }, [id, month,year]); // Include id and month as dependencies
  
//  console.log(staff);
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
        await EditUser(id,month,year,staff);
   // console.log('Staff added successfully:',{ year,month,data: staff});
   // Optionally, navigate to another page after adding staff
   // navigate('/all');
      alert("Data Edit successfully");
      navigate(`/all/admin/${year}/${month}`);
 } catch (error) {
   console.error('Error editing staff:', error);
   alert("Fill all Fields :- Refresh the Page and edit again ");
 }
};
  return (
    <div>
      <h2>Edit Entry for {month}, {year}</h2>
      <Container>
        <Typography variant='h4' margin={'10px'}>Edit Staff Data</Typography>
         <Typography variant='h6'>Staff Details</Typography>
     <Employee >
      <FormControl ><InputLabel>Mobile No.</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="ID" value={staff.ID}></Input>
        {/* <Typography variant="caption" color="error">
          {errors.ID}
        </Typography> */}
        </FormControl>
        {/* <FormControl><InputLabel>Month</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} name="Month"></Input>
        </FormControl> */}
        <FormControl><InputLabel>Name</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.Name} name="Name"></Input>
        </FormControl>
        <FormControl><InputLabel>Designation</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.Designation} name="Designation"></Input>
        </FormControl>
            <FormControl><InputLabel>PayScale(in words)</InputLabel>
        <Input type='text' onChange={(e)=>onValueChange(e)} value={staff.PayScale} name="PayScale"></Input>
        </FormControl>
        <FormControl><InputLabel>Level</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.Level} name="Level"></Input>
        </FormControl>
     </Employee>
      <Typography variant='h6'>EMOLUMENT</Typography>
     <Employee>
     <FormControl>
        <InputLabel>PayMatrix</InputLabel>
        <Input   onChange={(e)=>onValueChange(e)}  value={staff.PayMatrix} name="PayMatrix" ></Input>
     </FormControl>
     <FormControl>
        <InputLabel>DA</InputLabel>
        <Input   disabled value={staff.DA}></Input>
     </FormControl>
     <FormControl>
        <InputLabel>AdditionalIncrement</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.AdditionalIncrement} name ="AdditionalIncrement"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>HRA</InputLabel>
        <Input  onChange={(e)=>onValueChange(e)}value={staff.HRA} name ="HRA" ></Input>
     </FormControl>
     <FormControl>
        <InputLabel>CCA</InputLabel>
        <Input  onChange={(e)=>onValueChange(e)} value={staff.CCA} name ="CCA"></Input>
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
        <Input  onChange={(e)=>onValueChange(e)} value={staff.EPF} name="EPF"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>GSLI</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.GSLI} name ="GSLI"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>HouseRent</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.HouseRent} name ="HouseRent"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>WaterCharge</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.WaterCharge} name ="WaterCharge"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>Mobile</InputLabel>
        <Input onChange={(e)=>onValueChange(e)}value={staff.Mobile}  name ="Mobile"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>ElectricCharge</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.ElectricCharge} name ="ElectricCharge"></Input>
     </FormControl>
     <FormControl>
        <InputLabel>TDS</InputLabel>
        <Input onChange={(e)=>onValueChange(e)} value={staff.TDS} name ="TDS"></Input>
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
        <Button variant='contained' onClick={()=>{viewDetails()}}>Edit staff Data</Button>
     </FormControl>
    </Container>
    </div>
  );
};

export default EditStaff;
