import React, { useState } from 'react';
import { RegisterUser } from '../service/api';
import { useNavigate } from "react-router-dom";
import {Box, Button, FormGroup, Input,styled, Select, Typography, FormControl} from "@mui/material";

const Container=styled(Box)`
display:flex;
Width:30%;
margin:10% auto;
border:1px solid black;
background:#dc5e5e66;
border-radius:10px;
padding:2%;
font-size:15px;
flex-direction:column;`;
const Fields=styled(FormControl)`
display:flex;
flex-direction:row;
margin:2% 14%
`;


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Id: '',
    Password: '',
    ConfirmPassword: '',
    Role: 'admin',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onValueChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isFormValid =
    formData.Password === formData.ConfirmPassword &&
    formData.Password !== '' &&
    formData.ConfirmPassword !== '' &&
    isStrongPassword.test(formData.Password);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {  
    console.log(formData);
      // Make an API call using Axios with the FormData object
      const response = await RegisterUser(formData);
      
      // Handle the response
      alert('Registration successful');

      // Reset the form after successful registration
      setFormData({
        Id: '',
        Password: '',
        ConfirmPassword: '',
        Role: 'admin',
      });
      if(formData.Role==="admin"){
      navigate("/year");
      }
      else{
        navigate(`/staffDash/${formData.Id}`);
      }
    } catch (error){
      // Handle errors, e.g., show an error message to the user
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant='h5' style={{margin:"auto"}}>Register</Typography>
      <FormGroup >
        <Fields><label>
          Mobile No. :
          <Input type="text" value={formData.Id} name="Id" onChange={(e) => onValueChange(e)} required />
        </label></Fields>
        <Fields><label>
          Password:
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            value={formData.Password}
            name="Password"
            onChange={(e) => onValueChange(e)}
            required
          />
        </label>
        <Button type="button" onClick={togglePasswordVisibility}>
          {isPasswordVisible ? 'Hide' : 'Show'}
        </Button>
        </Fields>
        
        <Fields><label>
          Confirm Password:
          <Input
            type="password"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={(e) => onValueChange(e)}
            required
          />
        </label></Fields>
        <Fields><label>
          Role:
          <select style={{marginLeft:"30px"}}value={formData.Role} name="Role" onChange={(e) => onValueChange(e)}>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </label></Fields>
        <Button onClick={(e)=>handleRegister(e)}>Register</Button>
      </FormGroup>
    </Container>
  );
};

export default Register;
