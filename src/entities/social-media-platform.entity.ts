import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SocialMediaPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
