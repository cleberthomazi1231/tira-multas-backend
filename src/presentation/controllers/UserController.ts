import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/app';

const UserController = {
    create({ userService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const user = await userService.create(body);
                return res.status(201).json(user);
            } catch (error) {
                next(error);
            }
        };
    },
    update({ userService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req;
                const { id } = req.params;
                const user = await userService.update(id, body);
                return res.status(200).json(user);
            } catch (error) { 
                next(error);
            }
        };
    },
    delete({ userService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                await userService.delete(id);
                return res.status(200).json();
            } catch (error) { 
                next(error);
            }
        };
    },
    find({ userService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params ;
                const user = await userService.findById(id);
                return res.status(200).json(user);
            } catch (error) { 
                next(error);
            }
        };
    },
    list({ userService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { query } = req;
                const users = await userService.findAll(query as Query);
                return res.status(200).json(users);
            } catch (error) { 
                next(error);
            }
        };
    }
};

export default UserController;