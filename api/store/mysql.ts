import config from './../../config';
import mysql from 'mysql';
import { table } from 'console';

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection: mysql.Connection;

function handleCon() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table:string) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

// function get(table:string, id:string) {
//     return new Promise((resolve, reject) => {
//         connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
//             if (err) return reject(err);
//             resolve(data);
//         })
//     })
// }

function insert(table:string, data:any) {    
    return new Promise((resolve, reject) => {

        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) {
                reject({code: err.code, message: err.message});
            };
            resolve(result);
        })
        
    })
}

function update(table:string, id:string, valueId:string, data:any) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE ${id}=?`, [data, valueId], (err, result) => {
            if (err) return reject({code: err.code, message: err.message});
            resolve(result);
        })
    })
}

function deleteRegisters(table:string, id:string, valueId:string) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${id}=?`,valueId,(err, result) => {
            if (err) {
                return reject({code: err.code, message: err.message})
            }
            resolve(result)
        })
    })
}

function query(table:string, query:any, join?:any) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, res) => {
            if (err) return reject({code: err.code, message: err.message});
            resolve(res);
        })
    })
}

const store = {
    list,
    insert,
    update,
    deleteRegisters,
    query
};

export default store;