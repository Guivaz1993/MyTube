CREATE TABLE users(
	id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE videos(
	id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    link TEXT NOT NULL
);

CREATE TABLE rooms(
	id SERIAL PRIMARY KEY,
  	name VARCHAR(50) NOT NULL,
  	user_id INT REFERENCES users(id),
  	video_id INT REFERENCES videos(id)
);