DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id       INT          NOT NULL SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role     VARCHAR(255),
  CHECK (role='ROLE_ADMIN' OR role='ROLE_USER')
);

DROP TABLE IF EXISTS unconfirmedUser;

CREATE TABLE unconfirmedUser (
  id       INT          NOT NULL SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role     VARCHAR(255),
  registration_hash VARCHAR(255) NOT NULL
);
