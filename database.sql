CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (50) NULL,
    stock_quantity INTEGER (50) NULL,
);