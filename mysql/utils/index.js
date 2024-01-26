import express from "express";
const app = express();
 import { db_con } from "./coxn"; 
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});
 

//Crear ruta para crear base de datos y usarla

 app.get("/createDatabase", (req, res) => {
  
    let databaseName = "gfg_db";
  
    let createQuery = `CREATE DATABASE ${databaseName}`;
  
    // use the query to create a Database.
    database.query(createQuery, (err) => {
        if(err) throw err;
  
        console.log("Database Created Successfully !");
  
        let useQuery = `USE ${databaseName}`;
        db_con.query(useQuery, (error) => {
            if(error) throw error;
  
            console.log("Using Database");
              
            return res.send(
`Created and Using ${databaseName} Database`);
        })
    });
});