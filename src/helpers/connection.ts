import mariadb from 'mariadb';

const dbConnPool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'interview_db',
  connectionLimit: 10,
});

export { dbConnPool };
