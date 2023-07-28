import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Address } from './address.entity';
import { SocialMediaLink } from './social-media-link.entity';
import { Skills } from './skills.entity';
import { Experience } from './experience.entity';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ name: 'current_job_title', length: 100, nullable: false })
  currentJobTitle: string;

  @OneToOne(() => Address, (address: Address) => address.applicant, { cascade: true, onDelete: 'CASCADE' })
  address: Address;

  @OneToMany(() => SocialMediaLink, (socialMediaLink) => socialMediaLink.applicant, { cascade: true, onDelete: 'CASCADE' })
  socialMediaLinks: SocialMediaLink[];

  @OneToMany(() => Skills, (skill) => skill.applicant, { cascade: true, onDelete: 'CASCADE' })
  skills: Skills[];

  @OneToMany(() => Experience, (experience) => experience.applicant, { cascade: true, onDelete: 'CASCADE' })
  experience: Experience[];
}
