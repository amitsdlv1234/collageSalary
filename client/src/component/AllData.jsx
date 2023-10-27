import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import {Button, FormControl, FormGroup, Table, TableBody, TableCell, TableHead, TableRow ,styled} from '@mui/material'
import { getUsers,deleteUser} from '../service/api';
import {Link} from 'react-router-dom';

const StyledTable=styled(Table)`width:95%;
                                margin:50px auto 0 auto;`

const THead=styled(TableRow)`background:black;
                             width:98vw;
                             z-index: 998;
                            &>th {
                              color:#ffff;
                              font-size:20px  
} ` ;
const TBody = styled(TableRow)`
margin-top: 100px;
& > td {
  font-size: 20px;
}
`;
                                          
                                          
 const Filterbox = styled(FormGroup)`
 display: flex;
 flex-direction: row;
 border: 1px solid black;
 background:rgb(167 77 77);
 margin:0px 2px;
 padding: 5px;
 position: fixed;
 top: 0;
 width: 99%;
 z-index: 999; // Set a high z-index to make sure it appears above other elements
 & > div {
     width: 200px;
     height: 30px;
     margin: auto;
 }
 & > div input {
     width: 200px;
     height: 30px;
 }
`;

                 

function AllUser() {
  const [users,setUsers]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {year,month}=useParams();
  useEffect(() => {
    getAllUsers(month,year);
  }, [month,year]);

  const getAllUsers = async () => {
    try {
      let res = await getUsers(month,year);
      console.log('Fetched users:', res.data); // Add this line to check the fetched data
      setUsers(res.data || []); // Ensure that setUsers never receives null or undefined
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUserDetails= async(id,month,year)=>{
    await deleteUser(id,month,year);
          getAllUsers();
  }

  const filteredUsers = users.filter(
    (user) =>
        user.ID.toString().includes(searchTerm) ||
        user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Designation.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <>
    <Filterbox>
                <FormControl>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by ID, Name, or Designation"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    style={{ marginRight: '50px' }}
                    onClick={() => {
                        setSearchTerm('');
                        getAllUsers();
                    }}
                >
                    Reset
                </Button>
            </Filterbox>
      {filteredUsers && filteredUsers.length > 0 ? (
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
            {filteredUsers.map((user) => (
              <TBody key={user.ID}>
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
                    to={`/ViewData/${user.ID}/${year}/${month}`}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 10 }}
                    component={Link}
                    to={`/edit/${user.ID}/${year}/${month}`}
                  >
                    Edit
                  </Button>
                  <Button variant="contained" onClick={() => deleteUserDetails(user.ID,user.Month,user.Year)}>
                    Delete
                  </Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      ) : (
        <div>No users found.</div>
      )}
    </>
  );
}
export default AllUser
