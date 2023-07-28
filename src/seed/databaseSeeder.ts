import { Connection } from 'typeorm';
import { Applicant } from '../entities/applicant.entity';
import { SocialMediaPlatform } from '../entities/social-media-platform.entity';

import * as information from './information.json';

async function seedDatabase(connection: Connection): Promise<void> {
  const applicantRepository = connection.getRepository(Applicant);
  const socialMediaPlatformRepository = connection.getRepository(SocialMediaPlatform);

  const applicantsCount = await applicantRepository.count();

  if (applicantsCount === 0) {

    const PLATFORMS =  [
      {
        name: 'LinkedIn',
      },
      {
        name: 'GitHub',
      }
    ];

    await socialMediaPlatformRepository.create(PLATFORMS);

    const newApplicant = applicantRepository.create(information);

    await applicantRepository.save(newApplicant);
    console.log('Database seeded successfully!');
  } else {
    console.log('Database is not empty. Skipping seeding.');
  }
}

export default seedDatabase;
