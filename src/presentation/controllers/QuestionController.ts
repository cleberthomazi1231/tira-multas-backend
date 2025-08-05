import { Request, Response, NextFunction } from 'express';
import { AppConfig } from '../../config/app';

const QuestionController = {
    create({ questionService }: AppConfig['services']) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { body } = req;
                const question = await questionService.create(body);
                return res.status(201).json(question);
            } catch (error) {
                next(error);
            }
        };
    },
    update({ questionService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try { 
                const { body } = req;
                const { id } = req.params;
                const question = await questionService.update(id, body);
                return res.status(200).json(question);
            } catch (error) { 
                next(error);
            }
        };
    },
    delete({ questionService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                await questionService.delete(id);
                return res.status(200).json();
            } catch (error) { 
                next(error);
            }
        };
    },
    find({ questionService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { id } = req.params ;
                const question = await questionService.findById(id);
                return res.status(200).json(question);
            } catch (error) { 
                next(error);
            }
        };
    },
    list({ questionService }: AppConfig['services']){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const { query } = req;
                const questions = await questionService.findAll(query as Query);
                return res.status(200).json(questions);
            } catch (error) { 
                next(error);
            }
        };
    }
};

export default QuestionController;