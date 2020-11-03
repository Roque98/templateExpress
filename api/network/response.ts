import {Request, Response} from 'express';

function success(req:Request, res:Response, message:any, status:number) {
    let statusCode = status || 200;
    let MESSAGE = message || '';

    res.status(statusCode).json({
        error: false,
        status: statusCode,
        body: MESSAGE
    });
}

function error(req:Request, res:Response, message: any, status:number, userMessage = 'Internal error server') {
    let statusCode = status || 500;

    console.log(message || userMessage);    

    res.status(statusCode).json({
        error: true,
        status: statusCode,
        body: userMessage
    })
}

const respuesta = {
    success, 
    error
};

export default respuesta;