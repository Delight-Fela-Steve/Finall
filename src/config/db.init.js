const mysql = require("mysql2");
require('dotenv/config');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
    host: DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD
})

connection.connect((err)=>{
    if(err){
        console.log(err)
    }
})

// Create Database if it does not exist
exports.createDB=()=>{
    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, _)=>{
        if(err){
            return console.log(err)
        }
        this.createTables();
        return console.log(`DATABASE ${DB_NAME} created successfully`)
    });
}


const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NULL,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(2000) NULL,
    free BOOLEAN,
    premium BOOLEAN DEFAULT 0,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createBankTable = `
CREATE TABLE IF NOT EXISTS banks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user INT,
    FOREIGN KEY (user) REFERENCES users(id),
    account_number VARCHAR(50) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    logo VARCHAR(2000) NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

exports.createTables=()=>{
    let connection = mysql.createConnection({
        host: DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        database:DB_NAME
    })
    connection.query(createUserTable,(err,_)=>{
        if(err){
            return console.log(err);
        };
        return console.log("User Table Created Successfully");
    });
    connection.query(createBankTable,(err,_)=>{
        if (err){
            return console.log(err)
        }
        return console.log("Bank Table Created Successfully");
    })
}

this.createDB();

setTimeout(()=>{
    process.exit(0);
},1000);


