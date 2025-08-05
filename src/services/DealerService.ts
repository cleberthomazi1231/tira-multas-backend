import { BadRequestError } from '../app/errors';
import Dealer, { DealerProps } from '../domain/Dealer';
import BCrypt from '../infra/cryptography/bcrypt';
import DealerRepository from '../infra/database/knex/repositories/DealerRepository';

export default class DealerService { 
    private dealerRepository: DealerRepository;

    constructor(){
        this.dealerRepository = new DealerRepository();
    }

    async create(data: DealerProps){
        const hashedPassword = await BCrypt.generate(data.password as string);
        const dealer = Dealer.create({ ...data, password: hashedPassword });
        return this.dealerRepository.save(dealer);
    }

    async update(id: string, data: DealerProps){
        const dealer = await this.findById(id);
        const updateDealer = Dealer.create({ ...dealer, ...data });
        return this.dealerRepository.update(updateDealer);
    }

    async delete(id: string){
        return this.dealerRepository.delete(id); 
    }

    async findBy(field: string, value: string){
        const dealer = await this.dealerRepository.findBy(field, value);
        if(!dealer) throw new BadRequestError([{
            field: 'id', message: 'dealer_not_exists'
        }]);
        return dealer;
    }

    async findById(id: string){
        const dealer = await this.dealerRepository.findById(id);
        if(!dealer) throw new BadRequestError([{
            field: 'id', message: 'dealer_not_exists'
        }]);
        return dealer;
    }
    
    async findAll(query: Query){
        const dealers = await this.dealerRepository.findAll(query);
        return dealers;
    }
}