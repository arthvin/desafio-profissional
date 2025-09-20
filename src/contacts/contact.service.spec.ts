import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

const mockContactRepository = {
  create: jest.fn(),
  save: jest.fn(),
};

describe('ContactsService', () => {
  let service: ContactsService;
  let repository: Repository<Contact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockContactRepository,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    repository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um contato', async () => {
    const contato = { name: 'Arthur', email: 'arthur@email.com', phone: '123456' } as Contact;

    mockContactRepository.create.mockReturnValue(contato);
    mockContactRepository.save.mockResolvedValue({ ...contato, id: 1 });

    const result = await service.create(contato);

    expect(repository.create).toHaveBeenCalledWith(contato);
    expect(repository.save).toHaveBeenCalledWith(contato);
    expect(result).toEqual(expect.objectContaining(contato));
  });
});
