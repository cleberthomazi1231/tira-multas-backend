import { BadRequestError } from '../app/errors';
import User, { UserProps } from '../domain/User';
import BCrypt from '../infra/cryptography/bcrypt';
import UserRepository from '../infra/database/knex/repositories/UserRepository';

export default class UserService { 
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data: UserProps){
        const hashedPassword = await BCrypt.generate(data.password as string);
        const user = User.create({ ...data, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async update(id: string, data: UserProps){
        const user = await this.findById(id);
        if(data.password) 
            data.password = await BCrypt.generate(data.password);
        const updateUser = User.create({ ...user, ...data });
        return this.userRepository.update(updateUser);
    }

    async delete(id: string){
        return this.userRepository.delete(id);
    }

    async findBy(field: string, value: string){
        const user = await this.userRepository.findBy(field, value);
        if(!user) throw new BadRequestError([{ 
            field: 'id', message: 'user_not_exists' 
        }]);
        return user;
    }

    async findById(id: string){
        const user = await this.userRepository.findById(id);
        if(!user) throw new BadRequestError([{
            field: 'id', message: 'user_not_exists'
        }]);
        return user;
    }
    
    async findAll(query: Query){
        const users = await this.userRepository.findAll(query);
        return users;
    }
}