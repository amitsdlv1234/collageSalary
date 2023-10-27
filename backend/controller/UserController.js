
import dbConnection from '../database/db.js';

export const RegisterUser = async (req, res) => {
  try {
    const { Id, Password, Role } = req.body;
    // console.log("Amit")
     console.log(Id , Password,Role)
    // Check for required fields
    if (!Id || !Password || !Role) {
        return res.status(400).json({ error: 'Invalid request parameters' });
      }

    const connection = await dbConnection();

    // Perform database operation: insert user data into registerData table
    const [result] = await connection.execute(
        'INSERT INTO RegisterData (Id, password, role) VALUES (?, ?, ?)',
        [Id, Password, Role] // Assuming file[0].filename is the stored filename
      );

    // Release the connection back to the pool
    connection.release();

    if (result.affectedRows === 1) {
      // User data successfully inserted
      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      // No rows were affected, indicating the insertion failed
      return res.status(500).json({ error: 'Failed to add user.' });
    }
  } catch (error) {
    // console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const SignInUser=async(req,res)=>{
try {
    const connection = await dbConnection();
    const { Id, password } = req.body;
    const [results] = await connection.execute('SELECT * FROM RegisterData WHERE Id = ? AND password = ?',
    [Id, password],);
    if (results.length > 0) {
        // User found, send a success response
        return res.status(200).json(results);
    }
    else{
        // console.log('SignIn failed:');  
        return res.status(200).json({message:"User not found ::::: Please Register ? "});
    }
} catch (error) {
    // User not found, send an error response
    console.log('SignIn failed:', error);
    return res.status(401).json({ error: 'Invalid credentials' });
}
}
export const addUser = async (req, res) => {
    try {
        const connection = await dbConnection();
        
        // Check if all required parameters are present in the request body
        const requiredParams = ['ID', 'Name', 'Designation', 'PayScale', 'Level', 'PayMatrix', 'AdditionalIncrement', 'HRA', 'CCA', 'EPF', 'GSLI', 'HouseRent', 'WaterCharge', 'Mobile', 'ElectricCharge', 'TDS', 'DA', 'GrandTotal', 'Total', 'Amount'];

        const user = req.body;
        const { month, year } = req.params;
        // console.log(user);
        // console.log("forLOop");
        for (const param of requiredParams) {
            if (user[param] === undefined) {
                console.log(`Warning: ${param} is undefined in the user object.`);
                user[param] = null;
            }
        }
        // console.log({error: `${param} is required.`});
        // console.log("For End");
        // Perform database operation: insert user data
        
        // Check if the table exists
        const [tables] = await connection.execute(`SHOW TABLES LIKE 'T${year}'`);
        
        // If the table doesn't exist, create it
        if (tables.length === 0) {
            await connection.execute(`CREATE TABLE T${year} (
                ID BIGINT ,
                Year INT,
                Month VARCHAR(255),
                Name VARCHAR(255),
                Designation VARCHAR(255),
                PayScale VARCHAR(255),
                Level VARCHAR(255),
                PayMatrix INT,
                AdditionalIncrement FLOAT,
                HRA FLOAT,
                CCA FLOAT,
                EPF FLOAT,
                GSLI FLOAT,
                HouseRent FLOAT,
                WaterCharge FLOAT,
                Mobile FLOAT,
                ElectricCharge FLOAT,
                TDS FLOAT,
                DA FLOAT,
                GrandTotal FLOAT,
                Total FLOAT,
                Amount FLOAT,
                PRIMARY KEY (ID, Year, Month)
            )`);
        } else {
            // console.log("Table already exists");
        }

        // Insert data into the table
        const [result, fields] = await connection.execute(`
            INSERT INTO T${year} (ID, Year, Month, Name, Designation, PayScale, Level, PayMatrix, AdditionalIncrement, HRA, CCA, EPF, GSLI, HouseRent, WaterCharge, Mobile, ElectricCharge, TDS, DA, GrandTotal, Total, Amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user.ID, year, month, user.Name, user.Designation, user.PayScale, user.Level, user.PayMatrix, user.AdditionalIncrement, user.HRA, user.CCA, user.EPF, user.GSLI, user.HouseRent, user.WaterCharge, user.Mobile, user.ElectricCharge, user.TDS, user.DA, user.GrandTotal, user.Total, user.Amount]);

        // Check if the insertion was successful
        if (result.affectedRows === 1) {
            // User data successfully inserted
            return res.status(200).json({ message: 'User added successfully!' });
        } else {
            // No rows were affected, indicating the insertion failed
            return res.status(500).json({ error: 'Failed to add user.' });
        }

        // Release the connection back to the pool
        connection.release();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getUsers = async (req, res) => {
  const {month,year}=req.params;
    const { id} = req.query; // Get filter parameters from query params

    try {
        const filters = [];
        const values = [];

        if (id) {
            filters.push('ID = ?');
            values.push(id);
        }
        if (month) {
            filters.push('Month = ?');
            values.push(month);
        }
        if (year) {
            filters.push('Year = ?');
            values.push(year);
        }

        let query = `SELECT * FROM T${year}`;
        if (filters.length > 0) {
            query += ' WHERE ' + filters.join(' AND ');
        }

        // console.log('Generated Query:', query, values); // Log the generated query for debugging

        const connection = await dbConnection(); // Establish database connection

        // Perform database operation: fetch users based on filters
        const [rows, fields] = await connection.execute(query, values);

        // Release the connection back to the pool
        connection.release();

        // Send the list of filtered users as a response
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id,month,year } = req.params; // Get the user ID from request parameters
        const connection = await dbConnection();
        
        // Perform database operation: delete user by ID
        const [result] = await connection.execute(`DELETE FROM T${year} WHERE id = ? AND month=? AND year=?`, [id,month,year]);
        
        // Release the connection back to the pool
        connection.release();

        if (result.affectedRows > 0) {
            // User deleted successfully
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            // User with given ID not found
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id, month ,year} = req.params; // Get the user ID from request parameters
        const connection = await dbConnection();
        // Perform database operation: fetch users
        const [rows, fields] = await connection.execute(`SELECT * FROM T${year} WHERE id=? AND month=? AND year=?`, [id, month,year]);
        // Release the connection back to the pool
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        // Send the list of users as a response
        return res.status(200).json(rows);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const editUser = async (req, res) => {
    try {
        const { id, month ,year} = req.params; // Get the user ID and month from request parameters
        const updatedUserData = req.body; // Get updated user data from request body

        const connection = await dbConnection();

        // Perform database operation: update user data by ID and month
        const [result] = await connection.execute(`
            UPDATE T${year} 
            SET 
                Name = ?, 
                Designation = ?, 
                PayScale = ?, 
                Level = ?, 
                PayMatrix = ?, 
                AdditionalIncrement = ?, 
                HRA = ?, 
                CCA = ?, 
                EPF = ?, 
                GSLI = ?, 
                HouseRent = ?, 
                WaterCharge = ?, 
                Mobile = ?, 
                TDS = ?, 
                DA = ?, 
                GrandTotal = ?, 
                Total = ?, 
                Amount = ?
            WHERE id = ? AND month = ?`,
            [
                updatedUserData.Name,
                updatedUserData.Designation,
                updatedUserData.PayScale,
                updatedUserData.Level,
                updatedUserData.PayMatrix,
                updatedUserData.AdditionalIncrement,
                updatedUserData.HRA,
                updatedUserData.CCA,
                updatedUserData.EPF,
                updatedUserData.GSLI,
                updatedUserData.HouseRent,
                updatedUserData.WaterCharge,
                updatedUserData.Mobile,
                updatedUserData.TDS,
                updatedUserData.DA,
                updatedUserData.GrandTotal,
                updatedUserData.Total,
                updatedUserData.Amount,
                id,
                month
            ]
        );

        // Release the connection back to the pool
        connection.release();

        if (result.affectedRows > 0) {
            // User data updated successfully
            return res.status(200).json({ message: 'User data updated successfully' });
        } else {
            // User with given ID and month not found
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const SearchStaff = async (req, res) => {
    try {
        const { id, month, year } = req.query; // Get filter parameters from query params

        console.log('user Params:', req.query); // Log filter parameters for debugging

        const user = [];
        const values = [];

        if (id) {
            user.push('ID = ?');
            values.push(id);
        }
        if (month) {
            user.push('Month = ?');
            values.push(month);
        }
        if (year) {
            user.push('Year = ?');
            values.push(year);
        }
        let query = `SELECT * FROM T${year}`;
        if (user.length > 0) {
            query += ' WHERE ' + user.join(' AND ');
        }

        // console.log('Generated Query:', query, values); // Log the generated query for debugging

        const connection = await dbConnection();

        // Perform database operation: fetch users based on filters
        const [rows, fields] = await connection.execute(query, values);

        // Release the connection back to the pool
        connection.release();

        // Send the list of filtered users as a response
        return res.status(200).json(rows);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
export const getSalary = async (req, res) => {
    // console.log(req.body);
    try {
         const year=req.body.year;
        const {id}=req.params;
        const connection = await dbConnection();
        // Perform database operation: fetch users
        const [rows, fields] = await connection.execute(`SELECT * FROM T${year} WHERE id=?`,[id]);
        // Release the connection back to the pool
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        // Send the list of users as a response
        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};