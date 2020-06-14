import { Pool } from "pg";

const pool = new Pool({
    /* host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'pevn',
    port: '5432' */

    host: 'ec2-34-198-243-120.compute-1.amazonaws.com',
    user: 'srwhsmjbsxdjvl',
    password: 'add9d409205bf0e0aeff054c19baad682a7bdd0386c6a2f23c41498a8035e151',
    database: 'd2huikpn51plh6',
    port: '5432'
});

module.exports = pool;