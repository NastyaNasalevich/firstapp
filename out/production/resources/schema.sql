SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS fanfics_tags;

CREATE TABLE fanfics_tags (
  fanfic_id  INT NOT NULL,
  tag_id     INT NOT NULL,
  CONSTRAINT FK_FANFIC_ID FOREIGN KEY (fanfic_id) REFERENCES fanfics (id),
  CONSTRAINT FK_TAG_ID FOREIGN KEY (tag_id) REFERENCES tags (id)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role     VARCHAR(255),
  CHECK (role='ROLE_ADMIN' OR role='ROLE_USER')
);

DROP TABLE IF EXISTS unconfirmedUser;

CREATE TABLE unconfirmedUser (
  id       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email    VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role     VARCHAR(255),
  registration_hash VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS fanfics;

CREATE TABLE fanfics (
  id           INT          NOT NULL AUTO_INCREMENT,
  title        VARCHAR(255) NOT NULL,
  creator_user VARCHAR(255) NOT NULL,
  creationDate TIMESTAMP    NOT NULL,
  description  VARCHAR(255) NOT NULL,
  genre        VARCHAR(255) NOT NULL,
  image        VARCHAR(255),
  tags         VARCHAR(255),
  CHECK (genre='DETECTIVE' OR genre='DRAMA' OR genre='FRIENDSHIP' OR genre='HISTORICAL_EPOCHS' OR genre='LOVE_HATE' OR genre='MYSTIC' OR genre='MYTHICAL_CREATURES' OR genre='PARODY, DAILY_LIFE' OR genre='PSYCHOLOGY' OR genre='ROMANCE' OR genre='HORRORS'),
  CONSTRAINT PK_FANFIC_ID PRIMARY KEY (id)
);

DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id       INT          NOT NULL AUTO_INCREMENT,
  tag_name VARCHAR(255) NOT NULL,
  fanfics  VARCHAR(255) NOT NULL,
  CONSTRAINT PK_TAG_ID PRIMARY KEY (id)
);

DROP TABLE IF EXISTS chapters;

CREATE TABLE chapters (
  id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  textBlock     VARCHAR(255) NOT NULL,
  mainFanfic    VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  creation_date DATE         NOT NULL,
  content       VARCHAR(255) NOT NULL,
  project_id    VARCHAR(255) NOT NULL,
  user_id       VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
  id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  value         INT          NOT NULL,
  id_chapter    VARCHAR(255) NOT NULL,
  id_user       VARCHAR(255) NOT NULL
);
