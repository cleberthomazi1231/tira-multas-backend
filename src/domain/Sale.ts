import { randomUUID } from 'node:crypto';

import Buyer, { BuyerProps } from './Buyer';
import Dealer, { DealerProps } from './Dealer';
import Resource, { ResourceProps } from './Resource';

export type SaleProps = {
    id: string,
    buyer: BuyerProps;
    dealer: DealerProps;
    resource: ResourceProps;
    status: 'APPROVED' | 'PENDING' | 'DENIED' | 'CANCELED';
    document: string;
    tax_value: number;
    discount: number;
    total_value: number;
    response_data?: string[];
    created_at: Date;
}

export default class Sale {
    static create(props: SaleProps) {
        const sale = {
            id: props.id || randomUUID(),
            buyer: Buyer.create(props.buyer),
            dealer: Dealer.create(props.dealer),
            resource: Resource.create(props.resource),
            status: props?.status || 'PENDING',
            document: props.document,
            tax_value: props.tax_value,
            discount: props.discount,
            total_value: props?.total_value || Number(props.resource.value),
            response_data: props?.response_data || [],
            created_at: props.created_at || new Date(),
        };
        return Object.freeze(sale);
    }
}