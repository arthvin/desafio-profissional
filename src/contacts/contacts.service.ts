import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private repo: Repository<Contact>,
  ) {}

  async create(dto: CreateContactDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
    phone?: string;
  }) {
    const page = Math.max(query.page || 1, 1);
    const limit = Math.min(query.limit || 10, 100);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.name) where.name = ILike(`%${query.name}%`);
    if (query.email) where.email = ILike(`%${query.email}%`);
    if (query.phone) where.phone = ILike(`%${query.phone}%`);

    const [items, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip,
      order: { name: 'ASC' },
    });

    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Contact not found');
    return entity;
  }

  async update(id: string, dto: UpdateContactDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    return this.repo.remove(entity);
  }
}
