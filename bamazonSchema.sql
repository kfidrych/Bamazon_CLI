DROP IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana", "Fruit", 1.00, 150),
("Raisin Bran", "Cereal", 3.50, 50),
("Ground Beef", "Meat", 4.25, 35),
("Tomato", "Vegetable", 0.75, 125),
("Penne", "Pasta", 2.50, 50),
("Cucumber", "Vegetable", 0.50, 100),
("Chicken Noodle", "Soup", 3.25, 65),
("Mushrooms", "Vegetable", 2.00, 25),
("Strawberries", "Fruit", 4.00, 40),
("Mint Chocolate Chip", "Ice_Cream", 3.75, 35);