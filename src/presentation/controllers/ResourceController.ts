import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/app';

const ResourceController = {
    create({ resourceService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const resource = await resourceService.create(body);
                return res.status(201).json(resource);
            } catch (error) {
                next(error);
            }
        };
    },
    update({ resourceService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req;
                const { id } = req.params;
                const resource = await resourceService.update(id, body);
                return res.status(200).json(resource);
            } catch (error) { 
                next(error);
            }
        };
    },
    delete({ resourceService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                await resourceService.delete(id);
                return res.status(200).json();
            } catch (error) { 
                next(error);
            }
        };
    },
    find({ resourceService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params ;
                const resource = await resourceService.findById(id);
                return res.status(200).json(resource);
            } catch (error) { 
                next(error);
            }
        };
    },
    list({ resourceService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { query } = req;
                const resources = await resourceService.findAll(query as Query);
                return res.status(200).json(resources);
            } catch (error) { 
                next(error);
            }
        };
    }
}; 

export default ResourceController;