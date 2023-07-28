import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Applicant } from './applicant.entity';
import { SocialMediaPlatform } from './social-media-platform.entity';

@Entity()
export class SocialMediaLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.socialMediaLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicant_id' })
  applicant: Applicant;

  @ManyToOne(() => SocialMediaPlatform)
  platform: SocialMediaPlatform;
}
