import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button, FormControl, FormGroup, Table, TableBody, TableCell, TableHead, TableRow ,Typography,styled} from '@mui/material'
import { getSalary} from '../service/api';
import {Link} from 'react-router-dom';

const StyledTable=styled(Table)`width:95%;
                                margin:0% auto 0 auto;`

const THead=styled(TableRow)`background:black;
                             width:98vw;
                             z-index: 998;
                            &>th {
                              color:#ffff;
                              font-size:20px  
} ` ;
// const TBody = styled(TableRow)`
// margin-top: 100px;
// & > td {
//   font-size: 20px;
// }
// `;
                                          
                                          
 const Filterbox = styled(FormGroup)`
 display: flex;
 flex-direction:column;
 border: 1px solid black;
 background:rgb(167 77 77);
 margin:5px 17% ;
 padding-left: 5vw;
 position: relative;
 top: 0;
 width: 60%;
 border-radius:3px;
 z-index: 999; // Set a high z-index to make sure it appears above other elements
 & > div input {
     width: 20vw;
     height: 3vh;
     margin: auto;
     padding:10px;
     border-radius:40px;;
 }
 & > div{
  display: flex;
 flex-direction:row;
 margin:5px auto;
}
`;
                 
function StaffSalary() {
  const {id}=useParams();
  const [users,setUsers]=useState([]);
  const [searchYear, setSearchYear] = useState({year:''});
  const onChangeYear=(e)=>{
    setSearchYear({...searchYear,[e.target.name]:e.target.value})
  }
  const getAllUsers = async () => {
    try {
      console.log(id,searchYear);
      let res = await getSalary(id,searchYear);
      console.log('Fetched users:', res.data); // Add this line to check the fetched data
      setUsers(res.data || []); // Ensure that setUsers never receives null or undefined
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  return (
    <>
    <Filterbox>
    <Typography>ENTER Year</Typography>
                <FormControl>
                    <input
                        type="text"
                        name="year"
                        placeholder="Enter year"
                        value={searchYear.year}
                        onChange={(e) => onChangeYear(e)}
                    />
                    <Button
                    variant="contained"
                    onClick={() => {
                        setSearchYear('');
                        getAllUsers();
                    }}
                >
                  Show
                </Button>
                </FormControl>
                
            </Filterbox>
      {users && users.length > 0 ? (
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>Mobile No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Pay Matrix</TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Amount</TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.ID}>
                <TableCell>{user.ID}</TableCell>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Designation}</TableCell>
                <TableCell>{user.Year}</TableCell>
                <TableCell>{user.Month}</TableCell>
                <TableCell>{user.PayMatrix}</TableCell>
                <TableCell>{user.GrandTotal}</TableCell>
                <TableCell>{user.Total}</TableCell>
                <TableCell>{user.Amount}</TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    style={{ marginRight: 10 }}
                    component={Link}
                    to={`/ViewData/${user.ID}/${user.Year}/${user.Month}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
         ) : (
          <div>No users found.</div>
        )}
    </>
  );
}
export default StaffSalary;
