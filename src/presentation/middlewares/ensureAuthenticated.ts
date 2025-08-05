import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../../app/errors';
import appConfig from '../../config/app';

export default function ensureAuthenticated(
    req: Request, res: Response, next: NextFunction
) {
    try {
        const bearerHeader = req.headers.authorization;

        if(!bearerHeader)     
            return res.status(401).json({
                error: 'invalid_token'
            });

        const [bearer, token] = bearerHeader.split(' ');
        if(bearer !== 'Bearer' || !token)
            return res.status(401).json({
                error: 'invalid_token'
            });

        jwt.verify(token, appConfig.secret);

        return next();
    } catch (e) {
        return res.status(401).json(new UnauthorizedError().object);
    }
}