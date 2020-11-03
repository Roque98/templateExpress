import store from '../../store/mysql'
import User from './interface.user';
const TABLA = 'user';
// `username` VARCHAR(32) NOT NULL,
//   `name` VARCHAR(64) NULL DEFAULT NULL,

function list() {
    return store.list(TABLA)
}

function get(username:string) {
    return store.query(TABLA, {username: username})
}

function insert(user:User) {
    return store.insert(TABLA, user);
}

function update(idUser:string, dataUser: any) {
    
    return store.update(TABLA, 'username',idUser, dataUser);
}

function deleteRegisters(idUser:string) {
    return store.deleteRegisters(TABLA, 'username', idUser);
}

const controller = {
    list,
    get,
    insert,
    deleteRegisters,
    update
}

export default controller;