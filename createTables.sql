CREATE TABLE users (
    idUser INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    username VARCHAR(20) NOT NULL,
    password VARCHAR (50) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    DEFAULT CHARSET UTF8;

CREATE TABLE products (
    idProduct INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    name VARCHAR(20) NOT NULL,
    description VARCHAR (50) NOT NULL,
    price INT NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    DEFAULT CHARSET UTF8;

CREATE TABLE sales (
    idSale INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idUSer INT NOT NULL,
    FOREIGN KEY(idUser) REFERENCES users(idUser),
    idProduct INT NOT NULL,
    FOREIGN KEY(idProduct) REFERENCES products(idProduct)
    )
    DEFAULT CHARSET UTF8;
