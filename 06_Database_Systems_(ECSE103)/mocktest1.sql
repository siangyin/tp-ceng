CREATE TABLE STAFF (
	STAFF_ID Number(5),
	NRIC VARCHAR2(8) NOT NULL,
	GENDER VARCHAR2(1) NOT NULL,
	FNAME VARCHAR2(50) NOT NULL,
	LNAME VARCHAR2(50) NOT NULL,
	PHONE VARCHAR2(8) NOT NULL,
	ADDRESS VARCHAR2(200),
	EMAIL VARCHAR2(200) NOT NULL,
	PASSWORD VARCHAR2(100) NOT NULL,
	BIRTHDATE DATE NOT NULL,
	CONSTRAINT staff_PK PRIMARY KEY (STAFF_ID)
);

CREATE TABLE DUTY_ROSTER (
	DUTY_ID Number(5),
	STARTDATE DATE NOT NULL,
	ENDDATE DATE NOT NULL,
	STARTTIME Number(4) NOT NULL,
	ENDTIME Number(4) NOT NULL,
	STAFF_ID Number(5),
	MANAGER_ID Number(5),
	CONSTRAINT duty_PK PRIMARY KEY (DUTY_ID),
	CONSTRAINT duty_staff_FK FOREIGN KEY (STAFF_ID)
	REFERENCES STAFF(STAFF_ID),
	CONSTRAINT duty_mgr_FK FOREIGN KEY (MANAGER_ID)
	REFERENCES STAFF(STAFF_ID)
);

CREATE TABLE BICYCLE (
	BICYCLE_ID Number(5),
	MODEL VARCHAR2(50) NOT NULL, 
	LAT VARCHAR2(10),
	LON VARCHAR2(10),
	LOCATION_TIMESTAMP DATE,
	CONSTRAINT bicycle_PK PRIMARY KEY (BICYCLE_ID)
);

CREATE TABLE CUSTOMER (
	CUST_ID Number(5),
	NRIC VARCHAR2(8) NOT NULL,
	GENDER VARCHAR2(1) NOT NULL,
	FNAME VARCHAR2(50) NOT NULL,
	LNAME VARCHAR2(50) NOT NULL,
	PHONE VARCHAR2(8) NOT NULL,
	ADDRESS VARCHAR2(200),
	EMAIL VARCHAR2(200) NOT NULL,
	PASSWORD VARCHAR2(100) NOT NULL,
	REGISTERDATE DATE DEFAULT SYSDATE NOT NULL,
	STATUS VARCHAR2(50),
	CONSTRAINT customer_PK PRIMARY KEY (CUST_ID)
);

CREATE TABLE REPORT (
	REPORT_ID Number(5),
	DESCRIPTION VARCHAR2(200) NOT NULL,
	STATUS VARCHAR2(200) NOT NULL,
	BICYCLE_ID Number(5),
	CUST_ID Number(5),
	STAFF_ID Number(5),
	CONSTRAINT report_PK PRIMARY KEY (REPORT_ID),
	CONSTRAINT report_staff_FK FOREIGN KEY (STAFF_ID)
	REFERENCES STAFF(STAFF_ID),
	CONSTRAINT report_cust_FK FOREIGN KEY (CUST_ID)
	REFERENCES CUSTOMER(CUST_ID),
	CONSTRAINT report_bicycle_FK FOREIGN KEY (BICYCLE_ID)
	REFERENCES BICYCLE(BICYCLE_ID)
);

CREATE TABLE RESERVATION (
	RES_ID Number(5),    
	STARTDATE DATE NOT NULL,
	ENDDATE DATE NOT NULL,
	STARTTIME Number(4) NOT NULL,
	ENDTIME Number(4) NOT NULL,
	STATUS VARCHAR2(50),
	BICYCLE_ID Number(5),
	CUST_ID Number(5),

	CONSTRAINT rsvp_PK PRIMARY KEY (RES_ID),
	CONSTRAINT rsvp_cust_FK FOREIGN KEY (CUST_ID)
	REFERENCES CUSTOMER(CUST_ID),
	CONSTRAINT rsvp_bicycle_FK FOREIGN KEY (BICYCLE_ID)
	REFERENCES BICYCLE(BICYCLE_ID)
);