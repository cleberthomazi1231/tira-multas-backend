import { randomUUID } from 'node:crypto';

export type ResourceProps = {
    id: string;
    type: string;
    name: string;
    description: string;
    article: string;
    code: string;
    fields: string[];
    categories: string[];
    document: string;
    value: number;
    photo: string;
    created_at: Date; 
}

export default class Resource {
    static create(props: ResourceProps){
        const resource = {
            id: props.id || randomUUID(),
            type: props.type,
            name: props.name,
            description: props.description,
            article: props.article,
            code: props.code,
            fields: props.fields || [],
            categories: props.categories || [],
            document: props.document,
            value: props.value,
            photo: props.photo,
            created_at: props.created_at || new Date()
        };
        return Object.freeze(resource);
    }
}