import { AddressDto, SocialMediaLinkDto, SkillsDto, ExperienceDto } from './create-applicant.dto';

export class UpdateApplicantDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  summary?: string;
  currentJobTitle?: string;
  address?: AddressDto;
  socialMediaLinks?: SocialMediaLinkDto[];
  skills?: SkillsDto[];
  experiences?: ExperienceDto[];
}
