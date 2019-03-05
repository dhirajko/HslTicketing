CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v1();

CREATE TABLE Users (
    id uuid DEFAULT uuid_generate_v4 (),
    username VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v1();

CREATE TABLE Tickets (
    id uuid  DEFAULT uuid_generate_v4 (),
    phoneNumber VARCHAR NOT NULL,
	userId uuid NOT NULL,
    ticketTypeId VARCHAR NOT NULL,
    customerTypeId VARCHAR NOT NULL,
	regionId VARCHAR NOT NULL,
	ticketId VARCHAR NOT NULL,
	validFrom date DEFAULT NOW(),
	validityPeriod VARCHAR,
	PRIMARY KEY (id),
	FOREIGN KEY (userId) references users(id)
    
	
);