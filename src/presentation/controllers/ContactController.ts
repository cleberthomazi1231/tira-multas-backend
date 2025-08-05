import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../app/errors';
import { AppConfig } from '../../config/app';

const ContactController = {
    send({ contactService  }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                await contactService.send(body);
                return res.status(200).json();
            } catch (error) {
                next(new UnauthorizedError());
            }
        };
    }
};

export default ContactController;