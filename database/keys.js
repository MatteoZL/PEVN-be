import { Pool } from "pg";

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'password',
    database: 'pevn'

    /* host: 'bibwymipdjrmf9jgfe1l-postgresql.services.clever-cloud.com',
    user: 'uwkdfaxou8zqwvctxwvk',
    password: 'frS9S0MIIAT4wMJ5DWKx',
    database: 'bibwymipdjrmf9jgfe1l',
    port: '5432' */
});

module.exports = pool;