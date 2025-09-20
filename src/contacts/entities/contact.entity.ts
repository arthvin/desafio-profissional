import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  @Index()
  name: string;

  @Column({ nullable: true, length: 120, unique: true })
  email?: string;

  @Column({ nullable: true, length: 30 })
  phone?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
