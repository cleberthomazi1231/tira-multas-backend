import { BadRequestError } from '../app/errors';
import Question, { QuestionProps } from '../domain/Question';
import QuestionRepository from '../infra/database/knex/repositories/QuestionRepository';

export default class QuestionService {
    private questionRepository: QuestionRepository;

    constructor(){
        this.questionRepository = new QuestionRepository();
    }

    async create (data: QuestionProps){
        const question = Question.create(data);
        return this.questionRepository.save(question);
    }

    async update(id: string, data: QuestionProps){
        const question = await this.findById(id);
        const updateQuestion = Question.create({ ...question, ...data });
        return this.questionRepository.update(updateQuestion);
    }

    async delete(id: string){
        return this.questionRepository.delete(id); 
    }

    async findById(id: string){
        const question = await this.questionRepository.findById(id);
        if(!question) throw new BadRequestError([{
            field: 'id', message: 'question_not_exists'
        }]);
        return question;
    }

    async findAll(query: Query){
        const questions = await this.questionRepository.findAll(query);
        return questions;
    }
}