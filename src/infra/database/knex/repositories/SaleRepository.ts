import db from '../index';
import Sale, { SaleProps } from '../../../../domain/Sale';

export default class SaleRepository {
    private table = 'sales';
 
    async save(sale: SaleProps){
        const { buyer, dealer, resource, ...data } = sale;
        await db.insert({
            ...data,
            response_data: JSON.stringify(data.response_data),
            buyer_id: buyer.id,
            dealer_id: dealer.id,
            resource_id: resource.id,
        }).into(this.table);
        return this.findById(sale.id);
    }

    async update(sale: SaleProps){
        await db.update(sale).where({ id: sale.id }).into(this.table);
        return sale;
    }

    async updateStatus(id: string, status: string){
        await db.update({
            status
        }).where({ id }).into(this.table);
    }

    async delete(id: string){
        return db.delete().where({ id }).into(this.table);
    }

    async findBy(field: string, value: string){
        const saleDb = await db.first().where({ [field]: value }).into(this.table);
        if(!saleDb) return null;
        return Sale.create(saleDb);  
    }

    async findById(id: string){
        const saleDb = await db
            .first()
            .leftJoin('buyers as b', 'b.id', '=', 'sales.buyer_id')
            .leftJoin('dealers as d', 'd.id', '=', 'sales.dealer_id')
            .leftJoin('resources as r', 'r.id', '=', 'sales.resource_id')
            .select( 
                'sales.*', 'b.name as buyer_name', 'b.last_name as last_name', 'b.document as buyer_document', 'b.telephone as buyer_telephone',
                'b.email as buyer_email', 'b.created_at as buyer_created_at',
                'b.zipcode as zipcode', 'b.uf as uf', 'b.city as city', 'b.neighborhood as neighborhood', 'b.street as street', 'b.number as number', 'b.complement as complement',
                'd.name as dealer_name', 'd.document as dealer_document',
                'r.name as resource_name', 'r.document as resource_document', 'r.value as resource_value',
                'r.categories as resource_categories', 'r.created_at as resource_created_at',
            )
            .where({ ['sales.id']: id })
            .into(this.table);
        if(!saleDb) return null;
        return Sale.create(this.parseData(saleDb));  
    }
    
    async findAll(_query: Query){
        const buyers = await db
            .leftJoin('buyers as b', 'b.id', '=', 'sales.buyer_id')
            .leftJoin('dealers as d', 'd.id', '=', 'sales.dealer_id')
            .leftJoin('resources as r', 'r.id', '=', 'sales.resource_id')
            .select( 
                'sales.*', 'b.name as buyer_name', 'b.document as buyer_document',
                'b.email as buyer_email', 'b.created_at as buyer_created_at',
                'd.name as dealer_name', 'd.document as dealer_document',
                'r.name as resource_name', 'r.document as resource_document',
                'r.value as resource_value', 'r.categories as resource_categories', 
                'r.created_at as resource_created_at',
            )
            .orderBy('created_at', 'asc')
            .into(this.table);
        
        const salesList = buyers.map((sale) => 
            Sale.create(this.parseData(sale)));
        return salesList;
    }

    async findAllByBuyerId(buyerId: string){
        const buyers = await db
            .leftJoin('buyers as b', 'b.id', '=', 'sales.buyer_id')
            .leftJoin('dealers as d', 'd.id', '=', 'sales.dealer_id')
            .leftJoin('resources as r', 'r.id', '=', 'sales.resource_id')
            .select( 
                'sales.*', 'b.name as buyer_name', 'b.document as buyer_document',
                'b.email as buyer_email', 'b.created_at as buyer_created_at',
                'd.name as dealer_name', 'd.document as dealer_document',
                'r.name as resource_name', 'r.document as resource_document',
                'r.value as resource_value', 'r.categories as resource_categories', 
                'r.created_at as resource_created_at',
            )
            .where({ ['sales.buyer_id']: buyerId })
            .orderBy('sales.created_at', 'desc')
            .into(this.table);
        
        const salesList = buyers.map((sale) => 
            Sale.create(this.parseData(sale)));
        return salesList;
    }

    private parseData(sale: any) {
        return {
            id: sale.id,
            status: sale.status,
            document: sale.document,
            tax_value: Number(sale.tax_value),
            discount: Number(sale.discount),
            total_value: Number(sale.total_value),
            response_data: sale.response_data,
            created_at: sale.created_at,
            buyer: {
                id: sale.buyer_id,
                name: `${sale.buyer_name} ${sale?.last_name || ''}`,
                document: sale.buyer?.buyer_document || '',
                telephone: sale.buyer_telephone || '',
                email: sale.buyer_email || '',
                uf: sale?.uf || '',
                zipcode: sale?.zipcode || '',
                city: sale?.city || '',
                neighborhood: sale?.neighborhood || '',
                street: sale?.street || '',
                number: sale?.number || '',
                complement: sale?.complement || '',
                created_at: sale.buyer?.created_at
            },
            dealer: {
                id: sale.dealer_id,
                name: sale.dealer_name,
                document: sale.dealer_document,
                office_name: sale.dealer_office,
                telephone: sale.dealer_telephone,
                email: sale.dealer_email,
                login: sale.dealer_login, 
                password: sale.dealer_password,
                plan: sale.dealer_plan,
                created_at: sale.dealer_created_at,
            },
            resource: {
                id: sale.resource_id,
                name: sale.resource_name,
                document: sale.resource_document,
                value: sale.resource_value,
                categories: sale.resource_categories,
                created_at: sale.resource_created_at
            }
        } as SaleProps;
    }
}