
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
    
  });


let query = "SELECT * FROM products";

connection.query(query, function (err,results){
    if(err) return console.log(err);
    console.table(results);
})
