import { randomUUID } from 'node:crypto';

export type BuyerProps = {
    id: string,
    name: string,
    last_name: string;
    document: string;
    telephone: string;
    email: string;
    password: string;
    zipcode: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    created_at: Date;
}

export default class Buyer {
    static create(props: BuyerProps) {
        const dealer = {
            id: props.id || randomUUID(),
            name: props.name,
            last_name: props.last_name,
            document: props.document,
            telephone: props.telephone,
            email: props.email,
            password: props.password,
            zipcode: props.zipcode,
            uf: props.uf,
            city: props.city,
            neighborhood: props.neighborhood,
            street: props.street,
            number: props.number,
            complement: props.complement,
            created_at: props.created_at || new Date(),
        };
        return Object.freeze(dealer);
    }
}