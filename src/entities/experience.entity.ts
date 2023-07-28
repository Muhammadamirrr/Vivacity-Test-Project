import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Applicant } from './applicant.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Applicant, (applicant) => applicant.experience, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;

  @Column({ length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
