import { Pool } from "pg";

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'pevn',
    port: '5432'
});

module.exports = pool;