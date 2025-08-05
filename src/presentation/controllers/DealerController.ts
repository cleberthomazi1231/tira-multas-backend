import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/app';

const DealerController = {
    create({ dealerService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req;
                const dealer = await dealerService.create(body);
                return res.status(201).json(dealer);
            } catch (error) {
                next(error);
            }
        };
    },
    update({ dealerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req; 
                const { id } = req.params;
                const dealer = await dealerService.update(id, body);
                return res.status(200).json(dealer);
            } catch (error) { 
                next(error);
            }
        };
    },
    delete({ dealerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                await dealerService.delete(id);
                return res.status(200).json();
            } catch (error) { 
                next(error);
            }
        };
    },
    find({ dealerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params ;
                const dealer = await dealerService.findById(id);
                return res.status(200).json(dealer);
            } catch (error) { 
                next(error);
            }
        };
    },
    list({ dealerService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { query } = req;
                const dealers = await dealerService.findAll(query as Query);
                return res.status(200).json(dealers);
            } catch (error) { 
                next(error);
            }
        }; 
    }
};

export default DealerController;