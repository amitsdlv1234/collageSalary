import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {getUser } from '../service/api';
// import axios from 'axios';
import {Box, Table,styled, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const Tbody=styled(Box)`
display:flex;
margin:0px auto;
width:90%`;
const Container=styled(Box)`
display:flex;
flex-direction:column;
margin:0px auto;
width:60%
`;
const Phandle=styled(Box)`
display:flex;
position:relative;
& > div {
    position: absolute;
    right:10%;
    margin-top:3%;
}`;
const ViewData = () => {
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const loadUserDetails = async () => {
     try {
       const response = await getUser(id, month,year);
       if (response && response.data) {
         setStaff(response.data[0]);
         setLoading(false); // Set loading to false after data is fetched
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

 useEffect(() => {
    console.log(staff); // Log the updated state after it has been set
  }, [staff]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tableCellStyle = {
    width:'30%',
    borderRight: '1px solid #ddd', // Vertical line between key and value
    paddingRight: '10px', // Padding between the line and the text
  };
  const handlePrint = () => {
    window.print(); // This will open the print dialog using the browser's print functionality
  };
  
  const handleDownload = () => {
    const printWindow = window.open('', '_blank'); // Open a new window/tab
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>User Details</title>
        </head>
        <body>
          <div>
            <h2>User Details</h2>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(staff)
                    .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
                    .join('')}
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print(); // Print the newly opened window
  };
  
  return (
    <Container>
        <Phandle>
        <h2>User Details</h2>
        <Box>
       <IconButton onClick={handlePrint} color="primary">
       <PrintIcon />
       </IconButton>
       </Box>
       </Phandle>
    <Tbody>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(staff).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell sx={tableCellStyle}>{key}</TableCell>
                {key === 'PhotoAndSignature' ? (
                  <TableCell>
                    <div>
                      <img src={value.photoUrl} alt="User Photo" style={{ width: '100px', height: 'auto' }} />
                      <img src={value.signatureUrl} alt="User Signature" style={{ width: '100px', height: 'auto' }} />
                    </div>
                  </TableCell>
                ) : (
                  <TableCell>{value}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Tbody>
  </Container>
  );
};

export default ViewData;
