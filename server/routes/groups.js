import express from 'express';
import validateInput from '../shared/validations/signup';
import shortid from 'shortid';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

let router = express.Router();

//Pooling
import { Pool } from 'pg';
const connectionString = 'postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu';
const pool = new Pool({
    connectionString: connectionString,
});

router.get('/load', (req, res) => {
    const query = {
        text: 'select * from groups',
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else if (ress.rowCount > 0) {
                res.json(ress.rows);
            } else {
                res.status(401);
            }
        });
    });
});

router.post('/add', (req, res) => {
    const query = {
        text: 'insert into groups values($1, $2)',
        values: [shortid.generate(), req.body.newGroupName]
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err);
            } else {
                res.status(200);
            }
        });
    });
});

export default router;