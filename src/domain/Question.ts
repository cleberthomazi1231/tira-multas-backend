import { randomUUID } from 'node:crypto'; 

export type QuestionProps = {
    id: string;
    value: string;
    answer: string;
    created_at: Date;
};

export default class Question {
    static create(props: QuestionProps){
        const question = {
            id: props.id || randomUUID(),
            value: props.value,
            answer: props.answer,
            created_at: props.created_at || new Date(),
        };
        return Object.freeze(question);
    }
}