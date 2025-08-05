import { randomUUID } from 'node:crypto';

export type UserProps = {
    id: string,
    name: string,
    email: string,
    telephone: string,
    permissions: string | null,
    password: string | null,
    created_at: Date
}

export default class User {
    static create(props: UserProps){
        const user = {
            id: props.id || randomUUID(),
            name: props.name,
            email: props.email,
            telephone: props.telephone,
            password: props.password || null,
            permissions: props.permissions,
            created_at: props.created_at || new Date()
        };
        return Object.freeze(user);
    }
}