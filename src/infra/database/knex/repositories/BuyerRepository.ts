import db from '../index';
import Buyer, { BuyerProps } from '../../../../domain/Buyer';

export default class BuyerRepository {
    private table = 'buyers';

    async save(buyer: BuyerProps){
        await db.insert(buyer).into(this.table);
        return buyer;
    }
 
    async update(buyer: BuyerProps){
        await db.update(buyer).where({ id: buyer.id }).into(this.table);
        return buyer;
    }

    async delete(id: string){
        return db.delete().where({ id }).into(this.table);
    }

    async findBy(field: string, value: string){
        const buyerDb = await db.first().where({ [field]: value }).into(this.table);
        if(!buyerDb) return null;
        return Buyer.create(buyerDb);  
    }

    async findById(id: string){
        const buyerDb = await db.first().where({ id }).into(this.table);
        if(!buyerDb) return null;
        return Buyer.create(buyerDb); 
    }
    
    async findAll(_query: Query){
        const buyers = await db.select().into(this.table);
        return buyers.map((buyer) => Buyer.create(buyer));
    }
}