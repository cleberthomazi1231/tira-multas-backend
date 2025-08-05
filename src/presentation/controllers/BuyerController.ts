import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/app';

const BuyerController = {
    create({ buyerService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req;
                const buyer = await buyerService.create(body);
                return res.status(201).json(buyer);
            } catch (error) {
                next(error);
            }
        };
    },
    update({ buyerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req; 
                const { id } = req.params;
                const buyer = await buyerService.update(id, body);
                return res.status(200).json(buyer);
            } catch (error) { 
                next(error);
            }
        };
    },
    delete({ buyerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                await buyerService.delete(id);
                return res.status(200).json();
            } catch (error) { 
                next(error);
            }
        };
    },
    find({ buyerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params ;
                const buyer = await buyerService.findById(id);
                return res.status(200).json(buyer);
            } catch (error) { 
                next(error);
            }
        };
    },
    list({ buyerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { query } = req;
                const buyers = await buyerService.findAll(query as Query);
                return res.status(200).json(buyers);
            } catch (error) { 
                next(error);
            }
        }; 
    }
};

export default BuyerController;