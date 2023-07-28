import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Applicant } from './applicant.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  street: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ length: 50, nullable: true })
  state: string;

  @Column({ length: 20, nullable: true })
  zip: string;

  @OneToOne(() => Applicant, (applicant: Applicant) => applicant.address, { onDelete: 'CASCADE' })
  @JoinColumn()
  applicant: Applicant;
}
