import express, { NextFunction, Response, Request } from 'express';
import { MysqlError } from 'mysql';
import respuesta from './../../network/response';
import Controller from './controller.user';
import User from './interface.user';

const router = express.Router();

router.get('', list);
router.get('/:id', get);
router.post('', insert);
router.put('/:id', update);
router.delete('/:id', deleteUser)


function list(req:Request, res:Response, next:NextFunction) {
    Controller.list()
        .then((data) => {
            respuesta.success(req, res, data, 200);
        })
        .catch((error) => {
            respuesta.error(req, res, {...error}, 500);
        })
}

function get(req:Request, res:Response, next:NextFunction) {
    
    const idUser = req.params.id || '';
    
    Controller.get(idUser)
        .then((data) => {
            respuesta.success(req, res, data, 200);
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500);
        })
}


function insert(req:Request, res:Response, next:NextFunction) {
    try{
        const user:User = req.body;
        Controller.insert(user)
            .then((data) => {
                respuesta.success(req, res, data, 200);
            })
            .catch((error) => {
                if(error.code == 'ER_DUP_ENTRY'){
                    respuesta.error(req, res, error, 406, 'El nombre de usuario no esta disponible')
                } else if(error.code == 'ER_NO_DEFAULT_FOR_FIELD'){
                    respuesta.error(req, res, error, 406,error.message)
                } else {
                    respuesta.error(req, res, error, 500);
                }
                
            })
    } catch(error){
        respuesta.error(req, res,'Datos de registro invalidos', 500);
    }

}

function update(req:Request, res:Response, next:NextFunction) {
    const idUser:string = req.params.id || '';
    const user:any = req.body || {};
    
    Controller.update(idUser, user)
        .then((data) => {
            respuesta.success(req, res, data, 200);
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500);
        })

}

function deleteUser(req:Request, res:Response, next:NextFunction) {
    const idUser = req.params.id || '';
    Controller.deleteRegisters(idUser)
        .then((data) => {
            respuesta.success(req, res, data, 200);
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500);
        })
}

export default router;