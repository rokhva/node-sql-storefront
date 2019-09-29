const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//establishes connection to sql
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

//if the connection works then the start function is called
connection.connect(function (err) {
    if (err) throw err;
    start();
});


//displays the list of tasks the managers can choose to perform
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
                    addNew();
                    break;

                default:
                    console.log("If you're seeing this, something is REAL broken");
                    break;
            }
        })
}


//dispalys all the items that are for sale in the console (in table form)
function forSale() {
    console.log();

    let query = "SELECT * FROM products";
    connection.query(query, function (err, results) {
        if (err) return console.log(err);
        console.table(results);
    })
}

//checks database, and dsiplays only the items that have below 5 in value
//if all are in stock then a message saying "looks like you have enough of everything" is displayed in the console
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

//adds to the current inventory in the database
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

          let queryAdd = `UPDATE products SET stock_quantity = ${val.quantity} WHERE id = ${val.id}`;
          
          connection.query(queryAdd, function (err, results) {
            if (err) return console.log(err);
            console.table(results);
            // console.log(results.affectedRows + " products updated!\n");
        })
      })
}


//allows the user to add new items into the database
function addNew(){
    inquirer
      .prompt([
        {
          type: "input",
          name: "product",
          message: "What's the name of the product you want to add?"
        },
        {
            type: "input",
            name: "department",
            message: "What department is it in?"
        },
        {
            type: "number",
            name: "price",
            message: "How much is it?"
        },
        {
          type: "number",
          name: "quantity",
          message: "How many would you like to add?"
        }
      ])
      .then(function(val){
        
        console.log(val);
        
        let query = connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: val.product,
              department_name: val.department,
              price: val.price,
              stock_quantity: val.quantity
            },
            function(err, res) {
              if (err) throw err;
            //   console.log(res);
              console.log(res.affectedRows + " product inserted!\n");
              // Call updateProduct AFTER the INSERT completes
            //   updateProduct();
            }
          );

          forSale();
    })

}
