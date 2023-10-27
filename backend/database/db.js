import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Amit@1234',
    database: 'IntituteProject',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const dbConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected with Mysql");
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

export default dbConnection;
