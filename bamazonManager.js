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

connection.connect(function (err) {
    if (err) throw err;
    start();
});



function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "task",
                message: "Pick something to manage",
                choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
            }
        ])
        .then(function (val) {

            switch (val.task) {
                case "View products for sale":
                    forSale();
                    break;

                case "View low inventory":
                    lowInventory();
                    break;

                case "Add to inventory":
                    addInventory();
                    break;

                case "Add new product":

                    break;

                default:
                    console.log("If you're seeing this, something is REAL broken");
                    break;
            }
        })
}



function forSale() {
    console.log();

    let query = "SELECT * FROM products";
    connection.query(query, function (err, results) {
        if (err) return console.log(err);
        console.table(results);
    })
}


function lowInventory(){
    // let lowInventory =5;
    let queryQuant = "SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5";
    connection.query(queryQuant, function (err, results) {
        if (err) return console.log(err);

        if(results.length > 0){
            console.table(results);
        }
        
        else{
            console.log("looks like you have enough of everything!");
            start();
        }
    })
}


function addInventory(){

    inquirer
      .prompt([
        {
          type: "number",
          name: "id",
          message: "what's the id of the item you want to purchase?"
        },
        {
          type: "number",
          name: "quantity",
          message: "How many more would you like to add?"
        }
      ])
      .then(function(val){
          console.log(val.quantity);

          let queryAdd = `UPDATE products SET stock_quantity = ${val.quantity} WHERE id = ${val.id}`;
          
          connection.query(queryAdd, function (err, results) {
            if (err) return console.log(err);
            console.table(results);
        })
      })
}