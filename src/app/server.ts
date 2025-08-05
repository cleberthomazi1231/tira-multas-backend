import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { BadRequestError, UnauthorizedError } from './errors';
import logger from './logger';
import routes from './routes';

const server = express();
server.use(cors());
server.use(express.json({
    limit: '50mb'
}));
server.use('/files', express
    .static(path.resolve(__dirname, '..', 'uploads'), { maxAge: '365d' }));
server.use(routes);
server.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof BadRequestError)
        return res
            .status(404)
            .json(error.object);
    if (error instanceof UnauthorizedError)
        return res
            .status(401)
            .json(error.object);
    logger.Error(error.message);
    return res.status(500).json({
        error: 'internal_error',
    });
});  
export default server;
