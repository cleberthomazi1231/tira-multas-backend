import db from '../index';
import Question, { QuestionProps } from '../../../../domain/Question';

export default class QuestionRepository {
    private table = 'questions';

    async save(question: QuestionProps){
        await db.insert(question).into(this.table);
        return question;
    }

    async update(question: QuestionProps){
        await db.update(question).where({ id: question.id }).into(this.table);
        return question;
    }

    async delete(id: string){
        return db.delete().where({ id }).into(this.table);
    }

    async findById(id: string){
        const questionDb = await db.first().where({ id }).into(this.table);
        if(!questionDb) return null;
        return Question.create(questionDb); 
    }

    async findAll(_query: Query){
        const questions = await db.select().into(this.table);
        return questions.map((question) => Question.create(question));
    }
}
