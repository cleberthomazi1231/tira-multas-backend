import { BadRequestError } from '../app/errors';
import Resource, { ResourceProps } from '../domain/Resource';
import ResourceRepository from '../infra/database/knex/repositories/ResourceRepository';

export default class ResourceService {
    private resourceRepository: ResourceRepository;

    constructor(){
        this.resourceRepository = new ResourceRepository();
    }
 
    async create (data: ResourceProps){
        const resource = Resource.create(data);
        return this.resourceRepository.save(resource);
    }

    async update(id: string, data: ResourceProps){
        const resource = await this.findById(id);
        const updateResource = Resource.create({ ...resource, ...data });
        return this.resourceRepository.update(updateResource);
    }

    async delete(id: string){
        return this.resourceRepository.delete(id); 
    }

    async findById(id: string){
        const resource = await this.resourceRepository.findById(id);
        if(!resource) throw new BadRequestError([{
            field: 'id', message: 'resource_not_exists'
        }]);
        return resource;
    }

    async findAll(query: Query){
        const resources = await this.resourceRepository.findAll(query);
        return resources;
    }
}