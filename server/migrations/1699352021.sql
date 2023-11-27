UPDATE
  schemver
SET
  version_nr = 1699352021;

CREATE TABLE users (
  id SERIAL,
  username VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  display_name VARCHAR,
  netwerk_username VARCHAR,
  netwerk_password VARCHAR
);