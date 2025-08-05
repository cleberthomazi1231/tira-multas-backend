import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../app/errors';
import appConfig, { AppConfig } from '../../config/app';

type RefreshTokenPayload = {
    user_id: string;
}

const AuthController = {
    authenticate({ userService, authService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const user = await userService.findBy('email', body.login);
                const authData = 
                    await authService.authenticate(user, body.password);
                return res.status(200).json({ ...authData, user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    permissions: user.permissions
                } });
            } catch (error) {
                next(new UnauthorizedError());
            }
        };
    },
    refreshToken({ userService, authService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { refresh_token } = req.body;
                const payload 
                    = jwt.verify(refresh_token, appConfig.secret) as RefreshTokenPayload;
                const user = await userService.findById(payload.user_id);
                const authData = 
                    await authService.generateTokens(user);
                return res.status(200).json(authData);
            } catch (error) {
                console.log(error);
                next(new UnauthorizedError());
            }
        };
    },
    authDealer({ dealerService, authService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const dealer = await dealerService.findBy('login', body.login);
                if(dealer?.status === 'Desativado') 
                    return res.status(401).json({
                        message: 'account_desactived'
                    });
                const authData = 
                    await authService.generateTokensDealer(dealer);
                return res.status(200).json({ ...authData, dealer: {
                    id: dealer.id,
                    name: dealer.name,
                    email: dealer.email,
                } });
            } catch (error) {
                next(new UnauthorizedError());
            }
        };
    },
    authBuyer({ buyerService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const user = await buyerService.findBy('email', body.email);
                if(!user) return res.status(401);
                if(user.password !== body?.password) return res.status(401);
                return res.status(200).json({ user });
            } catch (error) {
                next(new UnauthorizedError());
            }
        };
    }
};

export default AuthController;