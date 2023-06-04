-- CREATE DATABASE webad1;
USE webad1;

CREATE TABLE Users (
userId INT(5) AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
role VARCHAR(30) NOT NULL DEFAULT 'user',
createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
profilePhoto TEXT
);

CREATE TABLE Restaurants (
restaurantId INT(5) AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
website VARCHAR(255),
contact VARCHAR(20),
add1 VARCHAR(100),
add2 VARCHAR(100),
add3 VARCHAR(100),
city VARCHAR(100),
country VARCHAR(100),
postalCode VARCHAR(20),
area VARCHAR(50),
status VARCHAR(10) DEFAULT 'draft'
);

CREATE TABLE Restaurant_Review (
  reviewId INT(5) AUTO_INCREMENT PRIMARY KEY,
  restaurantId INT(5) NOT NULL,
  userId INT(5) NOT NULL,
  title VARCHAR(255),
  comment TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
	status VARCHAR(10) DEFAULT 'draft',
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_restaurant_review FOREIGN KEY (restaurantId)
    REFERENCES Restaurants(restaurantId),
	CONSTRAINT FK_user_review FOREIGN KEY (userId)
    REFERENCES Users(userId)
);

CREATE TABLE Restaurant_Photo (
photoId INT(5) AUTO_INCREMENT PRIMARY KEY,
restaurantId INT(5) NOT NULL,
reviewId INT(5),
photoUrl TEXT NOT NULL,
defaultPhoto BOOLEAN DEFAULT false,
createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
addedBy INT(5),
CONSTRAINT FK_restaurant_photo FOREIGN KEY (restaurantId)
    REFERENCES Restaurants(restaurantId),
	CONSTRAINT FK_review_photo FOREIGN KEY (reviewId)
    REFERENCES Restaurant_Review(reviewId),
CONSTRAINT FK_user_photo FOREIGN KEY (addedBy)
   REFERENCES Users(userId)
);

CREATE TABLE Opening_Hours (
  openhrsId INT(5) AUTO_INCREMENT PRIMARY KEY,
  restaurantId INT(5) NOT NULL,
  dayOfWeek VARCHAR(20) NOT NULL,
  valueText	VARCHAR(255) NOT NULL,
CONSTRAINT FK_restaurant_openhrs FOREIGN KEY (restaurantId)
    REFERENCES Restaurants(restaurantId)
);

CREATE TABLE Category_Type (
categoryType VARCHAR(20) NOT NULL,
typeName VARCHAR(50) NOT NULL,
CONSTRAINT category_type PRIMARY KEY (categoryType, typeName)
);

CREATE TABLE Restaurant_Category_Type (
restaurantId INT(5) NOT NULL,
categoryType VARCHAR(20),
typeName VARCHAR(50),
  CONSTRAINT FK_category_type
    FOREIGN KEY (categoryType, typeName) REFERENCES Category_Type (categoryType, typeName),
  CONSTRAINT FK_restaurant_category_type
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(restaurantId)
);

CREATE TABLE Promotion (
promoId INT(5) AUTO_INCREMENT PRIMARY KEY,
restaurantId INT(5) NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
startDate DATETIME,
endDate DATETIME,
CONSTRAINT FK_restaurant_promo FOREIGN KEY (restaurantId)
    REFERENCES Restaurants(restaurantId)
);