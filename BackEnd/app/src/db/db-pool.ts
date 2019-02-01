import mysql = require("mysql");

export const pool = mysql.createPool({
    host:"localhost",
    port:3306,
    database:"thogakade",
    user:"root",
    password:"The@best",
    connectionLimit: 10
});