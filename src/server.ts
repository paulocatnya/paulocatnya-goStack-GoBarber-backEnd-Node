import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'

import cors from 'cors';

import routes from './shared/routes'
import './shared/database';
import uploadConfig from './config/upload'
import AppError from './shared/errors/AppError'

const app = express();

app.use(cors());

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory));


app.use(routes)

/// GLOBAL TRATACTIVE ERRORS
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.error(err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3335, () => {
    console.log(' Back-end GoBarber -- Subiu:3335 ! 💥')
}) 
