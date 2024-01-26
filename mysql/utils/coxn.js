import mysql from "mysql"
  
export let db_con  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ''
});
  

db_con.connect((err) => {
        if (err) {
          console.log("Database Connection Failed !!!", err);
        } else {
          console.log("connected to Database");
        }
    })


/*
export const db = () => {
}
*/
