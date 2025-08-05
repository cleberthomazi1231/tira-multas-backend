import db from '../index';
import Dealer, { DealerProps } from '../../../../domain/Dealer';

export default class DealerRepository {
    private table = 'dealers';

    async save(dealer: DealerProps){
        const { address, ...data } = dealer;
        await db.insert(address).into('address');
        await db.insert({ ...data, address_id: address?.id }).into(this.table);
        return dealer;
    }

    async update(dealer: DealerProps){
        const { address, ...data } = dealer;
        await db.update(address).where({ id: address?.id }).into('address');
        await db.update(data).where({ id: dealer.id }).into(this.table);
        return dealer;
    }

    async delete(id: string){
        return db.delete().where({ id }).into(this.table);
    }

    async findBy(field: string, value: string){
        const dealerDb = await db.first().where({ [field]: value }).into(this.table);
        if(!dealerDb) return null;
        return Dealer.create(dealerDb);  
    }

    async findById(id: string){
        const dealerDb = await db.first().where({ id }).into(this.table);
        const addressDb = await db.first()
            .where({ id: dealerDb.address_id }).into('address');
        if(!dealerDb) return null;
        return Dealer.create({ ...dealerDb, address: addressDb });
    }
    
    async findAll(_query: Query){
        const dealers = await db.select().into(this.table);
        const dealersList = await Promise.all(dealers.map(async (dealer) => {
            const address = await db.first()
                .where({ id: dealer.address_id }).into('address');

            return { ...dealer, address };
        }));
        return dealersList.map((dealer) => Dealer.create(dealer));
    }
}