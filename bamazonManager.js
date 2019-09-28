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
    password: "Edsheeran1//",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });



  function start(){
    inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "Pick something to manage",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
      }
    ])
    .then(function(val){
      
        switch (val.task) {
            case "View products for sale":
                
                break;

            case "View low inventory":
                
                break;
                
            case "Add to inventory":
                
                break;
            
            case "Add new product":
                
                break;
        
            default:
                console.log("If you're seeing this, something is REAL broken");
                break;
        }
    })
  }