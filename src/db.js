import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: 'postgres',
    password: 'superpass',
    database: 'docook_desarrollo'
});

pool.on('connect', () => {
    console.log('connected to the db');
});