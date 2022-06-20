DROP DATABASE IF EXISTS iad_test_express_db;

CREATE DATABASE iad_test_express_db;

USE iad_test_express_db;

create table contact (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_code VARCHAR(5) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT 0,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postcode VARCHAR(8) NOT NULL,
    street VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,

    CONSTRAINT pk_contact PRIMARY KEY (id),
    CONSTRAINT eu_contact UNIQUE (email),
    CONSTRAINT pnu_contact UNIQUE (phone_number)
);

CREATE USER 'iad_test'@'localhost' IDENTIFIED BY 'password_IAD_123';

GRANT ALL PRIVILEGES ON iad_test_express_db.contact TO 'iad_test'@'localhost';

flush privileges;