import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from '../src/contacts/contacts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from '../src/contacts/entities/contact.entity';

const mockRepo = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest
    .fn()
    .mockImplementation((entity) => Promise.resolve({ id: '1', ...entity })),
  findAndCount: jest.fn().mockResolvedValue([[{ id: '1', name: 'a' }], 1]),
  findOne: jest.fn().mockResolvedValue({ id: '1', name: 'a' }),
  remove: jest.fn().mockResolvedValue(true),
};

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: getRepositoryToken(Contact), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should create a contact', async () => {
    const created = await service.create({ name: 'João' } as any);
    expect(created).toHaveProperty('id');
  });

  it('should list contacts', async () => {
    const res = await service.findAll({});
    expect(res.total).toBe(1);
  });
});
