import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Applicant } from './applicant.entity';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Applicant, (applicant) => applicant.skills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;

  @Column({ length: 50, nullable: false })
  skillName: string;
}
