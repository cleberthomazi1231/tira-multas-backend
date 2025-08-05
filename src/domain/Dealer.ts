import { randomUUID } from 'node:crypto';
import Address, { AddressProps } from './Address';

export type DealerProps = {
    id: string,
    status: string,
    name: string,
    document: string,
    office_name: string,
    telephone: string,
    email: string,
    login: string,
    password: string,
    plan: string,
    address: AddressProps | null,
    created_at: Date
}

export default class Dealer {
    static create(props: DealerProps) {
        const dealer = {
            id: props.id || randomUUID(),
            status: props.status || 'ENABLED',
            name: props.name,
            document: props.document,
            office_name: props.office_name,
            telephone: props.telephone,
            email: props.email,
            login: props.login,  
            password: props.password,
            plan: props.plan,
            address: props.address ? Address.create(props.address) : null,
            created_at: props.created_at || new Date(),
        };
        return Object.freeze(dealer);
    }
}