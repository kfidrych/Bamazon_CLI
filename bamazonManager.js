var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tottis12",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    console.log("\nWelcome to Bamazon Manager!\n");
    inquirer.prompt({
        type: "list",
        name: "function",
        message: "Please select a function to perform: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Delete an Item"]
    }).then(function (response) {
        switch (response.function) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Delete an Item":
                deleteItem();
                break;
        };
    });
};

function newFunction() {
    console.log("");
    inquirer.prompt({
        type: "confirm",
        name: "progression",
        message: "Would you like to perform another function?"
    }).then(function (response) {
        if (response.progression === true) {
            start();
        } else {
            connection.end();
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + results[i].product_name + " | Price: $" +
                results[i].price + " | In Stock: " + results[i].stock_quantity);
        }
        newFunction();
    })
};

function viewLowInventory() {
    console.log("Here are all items with inventory < 5:\n")
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + results[i].product_name + " | Price: $" +
                results[i].price + " | In Stock: " + results[i].stock_quantity);
        }
        newFunction();
    });
};

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemChoice",
            message: "Please enter the item ID to add inventory to: "
        },
        {
            type: "input",
            name: "addQuantity",
            message: "How much stock would you like to add?"
        }
    ]).then(function (response) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: response.itemChoice }, function (err, results) {
            if (err) throw err;
            var itemStock = parseInt(results[0].stock_quantity);
            var addQuantity = parseInt(response.addQuantity);
            var newQuantity = itemStock + addQuantity;
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    { stock_quantity: newQuantity },
                    { item_id: response.itemChoice }
                ]),
                function (err, results) {
                    if (err) throw err;
                };
            console.log("Inventory Updated!")
            newFunction();
        });
    });
};

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "What is the name of the new item?"
        },
        {
            type: "input",
            name: "itemCategory",
            message: "What is the category of the new item?"
        },
        {
            type: "input",
            name: "itemPrice",
            message: "What is the price of the new item?"
        },
        {
            type: "input",
            name: "itemStock",
            message: "What is the starting inventory of the new item?"
        }
    ]).then(function (response) {
        var newItemInfo = { product_name: response.itemName, department_name: response.itemCategory, price: response.itemPrice, stock_quantity: response.itemStock };
        connection.query("INSERT INTO products SET ?", newItemInfo, function (err, results) {
            if (err) throw err;
        });
        console.log("New Item Added to Inventory!");
        newFunction();
    });
};

function deleteItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemChoice",
            message: "Please enter the item ID to delete: "
        }
    ]).then(function (response) {
        connection.query("DELETE FROM products WHERE ?", { item_id: response.itemChoice }, function (err, results) {
            if (err) throw err;
        });
        console.log("Item Deleted from Inventory!")
        newFunction();
    });
};