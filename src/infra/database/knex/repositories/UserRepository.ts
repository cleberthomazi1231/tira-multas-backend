import db from '../index';
import User, { UserProps } from '../../../../domain/User';

export default class UserRepository {
    private table = 'users';

    async save(user: UserProps){
        await db.insert(user).into(this.table);
        return user;
    }

    async update(user: UserProps){
        const data = { ...user } as any;
        if(!user.password)
            delete data.password;
        await db.update(data).where({ id: user.id }).into(this.table);
        return user;
    }

    async delete(id: string){
        return db.delete().where({ id }).into(this.table);
    }

    async findBy(field: string, value: string){
        const userDb = await db.first().where({ [field]: value }).into(this.table);
        if(!userDb) return null;
        return User.create(userDb);  
    }

    async findById(id: string){
        const userDb = await db.first().where({ id }).into(this.table);
        if(!userDb) return null;
        return User.create(userDb); 
    }
    
    async findAll(_query: Query){
        const users = await db.select().into(this.table);
        return users.map((user) => User.create(user));
    }
}