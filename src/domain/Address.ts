import { randomUUID } from 'node:crypto';

export type AddressProps = {
    id: string;
    zipcode: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    number: string;
    complement: string;
}

export default class Address {
    static create(props: AddressProps) {
        const address = {
            id: props.id || randomUUID(), 
            zipcode: props.zipcode,
            state: props.state,
            city: props.city,
            street: props.street,
            neighborhood: props.neighborhood,
            number: props.number,
            complement: props.complement,
        };
        return Object.freeze(address);
    }
}