import db from '../index';
import Resource, { ResourceProps } from '../../../../domain/Resource';

export default class ResourceRepository {
    private table = 'resources';

    public async save(resource: ResourceProps){
        await db.insert({
            ...resource,
            fields: JSON.stringify(resource.fields),
            categories: JSON.stringify(resource.categories)
        }).into(this.table);
        return resource;
    }

    async update(resource: ResourceProps){
        await db.update({
            ...resource,
            fields: JSON.stringify(resource.fields),
            categories: JSON.stringify(resource.categories)
        }).where({ id: resource.id }).into(this.table);
        return resource;
    }

    async delete(id: string){
        return db.delete().where({ id }).into(this.table);
    }

    async findById(id: string){
        const resourceDb = await db.first().where({ id }).into(this.table);
        if(!resourceDb) return null;
        return Resource.create(resourceDb); 
    }

    async findAll(_query: Query){
        const resources = await db.select().into(this.table);
        return resources.map((resource) => Resource.create(resource));
    }
}