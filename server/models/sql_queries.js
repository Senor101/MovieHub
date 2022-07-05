/**
 * Queries for creating tables
 */
const createDB = {
  movieDB: "create database if not exists movie_db",
};

const createTables = {
  companyTable:
    "create table if not exists production_company(name varchar(50) primary key, address varchar(65))",
  movieTable:
    "create table if not exists movie (movie_name varchar(100) not null primary key,length varchar(20), year_of_release int(4), plot_outline varchar(250),company_name varchar(50), foreign key(company_name) references production_company(name) on delete cascade on update cascade)",
  directorTable:
    "create table if not exists director (director_name varchar(50) primary key, director_DOB varchar(10))",
  actorTable:
    "create table if not exists actor (actor_name varchar(50) primary key, actor_DOB varchar(10))",
  // multivalue attribute genre referencing to title of movieTable
  genreTable:
    "create table if not exists Moviegenre (movie_name varchar(100),foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade, genre varchar(25))",
  // cardinal m-n relations to tables
  actedByTable:
    "create table if not exists acts(movie_name varchar(100),actor_name varchar(50), role varchar(50) primary key, foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade,foreign key(actor_name) references actor(actor_name) on delete cascade on update cascade)",
  directedByTable:
    "create table if not exists directs(movie_name varchar(100),director_name varchar(50), foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade,foreign key(director_name) references director(director_name) on delete cascade on update cascade)",
  director_act:
      "create table if not exists DirActs(Movie_name varchar(100),Director_name varchar(50),role varchar(25) primary key, foreign key(movie_name) references movie(movie_name) on delete cascade on update cascade,foreign key(Director_name) references director(director_name) on delete cascade on update cascade)",
  actorQuoteTable:
    "create table if not exists actorquotes (role_played varchar(50),quote varchar(150),foreign key(role_played) references acts(role) on delete cascade on update cascade)",
  directorQuoteTable:
    "create table if not exists directorquotes (role_played varchar(25),quote varchar(150),foreign key(role_played) references dirActs(role) on delete cascade on update cascade)"
};

/*
// Queries for insertion operations
*/
const insertIntoTable = {
  addProductionCompany: "insert into production_company values(?,?)",
  addgenre:"insert into moviegenre values(?,?)",
  insertIntoMovies: "insert into movie values(?,?,?,?,?)",
  addActor: "insert into actor values(?,?)",
  addacting : "insert into acts values(?,?)",
  addDirector: "insert into director values(?,?)",
  adddirecting : "insert into directs values(?,?)",
  addActorQuotes : "insert into actorquotes values(?,?,?)",
  addDirector_as_actor : "insert into diracts values(?,?)",
  addDirectorQuotes: "inset into directorquotes values (?,?,?)"
};

const showTable = {
  showMovies:
    "select * from movie natural join moviegenre",
  showCast:
    "select acts.movie_name ,director_name, group_concat(distinct acts.actor_name) as actors from directs,acts,actor group by movie_name",
  showCastDetails: "select * from actor natural join acts",
  showDirector: "select * from director natural join directs",
  showCompany: "select * from production_company",
  showActors : "Select actor_name,actor_DOB,movie_name from actor natural join acts",
  showScript : "select * from actorquotes union select * from directorquotes order by role_played"
};

module.exports = {
  createDB,
  createTables,
  insertIntoTable,
  showTable,
};