import { Response, Request } from 'express';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';

import { createApplicant, getApplicants } from '../applicants.controller';
import { Applicant } from '../../entities/applicant.entity';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('Applicant Controller', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'postgres',
      database: 'memory',
      dropSchema: true,
      entities: ['src/entities/**/*.ts'],
      synchronize: true,
      logging: false,
    });
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('should create a new applicant', async () => {
    const newApplicantData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      summary: 'I am a skilled developer with 12 years of experience.',
      currentJobTitle: 'Senior Software Engineer',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      socialMediaLinks: [
        {
          platformId: 1,
          url: 'https://www.linkedin.com/in/johndoe/',
        },
        {
          platformId: 2,
          url: 'https://github.com/johndoe',
        },
      ],
      skills: [
        {
          skillName: 'JavaScript',
        },
        {
          skillName: 'TypeScript',
        },
        {
          skillName: 'Node.js',
        },
      ],
      experiences: [
        {
          title: 'Software Engineer',
          description: 'Worked on various web applications.',
        },
        {
          title: 'Senior Software Engineer',
          description:
            'Led a team of developers to deliver high-quality software.',
        },
      ],
    };

    const applicantRepository = getRepository(Applicant);
    const saveMock = jest.fn();
    applicantRepository.save = saveMock;

    const req = getMockReq({ body: newApplicantData }) as Request;
    const { res } = getMockRes() as { res: Response };

    await createApplicant(req, res);

    expect(saveMock).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();

  });
});
