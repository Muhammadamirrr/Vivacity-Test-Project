import { AddressDto, SocialMediaLinkDto, SkillsDto, ExperienceDto } from './create-applicant.dto';

export class ViewApplicantDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  summary: string;
  currentJobTitle: string;
  address: AddressDto;
  socialMediaLinks: SocialMediaLinkDto[];
  skills: SkillsDto[];
  experience: ExperienceDto[];
}
