import { BadRequestError } from '../app/errors';
import Buyer, { BuyerProps } from '../domain/Buyer';
import BuyerRepository from '../infra/database/knex/repositories/BuyerRepository';

export default class BuyerService { 
    private buyerRepository: BuyerRepository;

    constructor(){
        this.buyerRepository = new BuyerRepository();
    }

    async create(data: BuyerProps){
        const buyer = Buyer.create(data);
        return this.buyerRepository.save(buyer);
    }

    async update(id: string, data: BuyerProps){
        const buyer = await this.findById(id);
        const updateBuyer = Buyer.create({ ...buyer, ...data });
        return this.buyerRepository.update(updateBuyer);
    }

    async delete(id: string){
        return this.buyerRepository.delete(id);
    }

    async findBy(field: string, value: string){
        const buyer = await this.buyerRepository.findBy(field, value);
        if(!buyer) throw new BadRequestError([{ 
            field: 'id', message: 'buyer_not_exists' 
        }]);
        return buyer;
    }

    async findById(id: string){
        const buyer = await this.buyerRepository.findById(id);
        if(!buyer) throw new BadRequestError([{
            field: 'id', message: 'buyer_not_exists'
        }]);
        return buyer;
    }
    
    async findAll(query: Query){
        const buyers = await this.buyerRepository.findAll(query);
        return buyers;
    }
}