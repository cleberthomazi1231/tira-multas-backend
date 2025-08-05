import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../app/errors';
import appConfig from '../config/app';
import { DealerProps } from '../domain/Dealer';
import { UserProps } from '../domain/User';
import BCrypt from '../infra/cryptography/bcrypt';

export default class AuthService { 
    async authenticate(user: UserProps, password: string){
        const isValid = await BCrypt.compare(password, user.password as string);
        if(!isValid) throw new UnauthorizedError();
        return this.generateTokens(user);
    } 

    async generateTokens(user: UserProps){
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                permissions: user.permissions
            },appConfig.secret, 
            { expiresIn: '7d' } 
        );
        const refreshToken = jwt.sign({ user_id: user.id }, appConfig.secret, 
            { expiresIn: '7d'}
        );
        return { token, refreshToken };
    }

    async generateTokensDealer(dealer: DealerProps){
        const token = jwt.sign(
            {
                id: dealer.id,
                name: dealer.name,
                email: dealer.email,
            },appConfig.secret, 
            { expiresIn: '7d' } 
        );
        const refreshToken = jwt.sign({ dealer_id: dealer.id }, appConfig.secret, 
            { expiresIn: '7d'}
        );
        return { token, refreshToken };
    }
}