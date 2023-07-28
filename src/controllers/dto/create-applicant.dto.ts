export class CreateApplicantDto {
  firstName: string;
  lastName: string;
  email: string;
  summary: string;
  currentJobTitle: string;
  address: AddressDto;
  socialMediaLinks: SocialMediaLinkDto[];
  skills: SkillsDto[];
  experiences: ExperienceDto[];
}

export class AddressDto {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export class SocialMediaLinkDto {
  id: number;
  url: string;
}

export class SkillsDto {
  skillName: string;
}

export class ExperienceDto {
  title: string;
  description: string;
}
