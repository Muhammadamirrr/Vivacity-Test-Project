import { Request, Response } from 'express';
import { getRepository, Like, createQueryBuilder } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

import { Applicant } from '../entities/applicant.entity';
import { Address } from '../entities/address.entity';
import { Skills } from '../entities/skills.entity';
import { Experience } from '../entities/experience.entity';
import { SocialMediaLink } from '../entities/social-media-link.entity';
import { logger } from '../../logger';

import {
  CreateApplicantDto,
  UpdateApplicantDto,
  ViewApplicantDto,
} from './dto';

// route - /awesome/applicant
export const getPersonalData = async (req: Request, res: Response) => {
  res.redirect('/api/applicants/1');
};

const ITEMS_PER_PAGE = 10;

const mapApplicantToViewDto = (applicant: Applicant): ViewApplicantDto => {
  const {
    id,
    firstName,
    lastName,
    email,
    summary,
    currentJobTitle,
    address,
    socialMediaLinks,
    skills,
    experience,
  } = applicant;
  const viewApplicant: ViewApplicantDto = {
    id,
    firstName,
    lastName,
    email,
    summary,
    currentJobTitle,
    address,
    socialMediaLinks,
    skills,
    experience,
  };
  return viewApplicant;
};

export const getApplicants = async (req: Request, res: Response) => {
  const applicantRepository = getRepository(Applicant);

  const { page = 1, limit = ITEMS_PER_PAGE, q } = req.query || {};

  try {
    let whereClause = {};
    if (q) {
      whereClause = [
        { firstName: Like(`%${q}%`) },
        { lastName: Like(`%${q}%`) },
        { email: Like(`%${q}%`) },
        { currentJobTitle: Like(`%${q}%`) },
      ];
    }

    const totalCount = await applicantRepository.count({ where: whereClause });
    const currentPage = page ? parseInt(page as string) : 1;
    const itemsPerPage = limit ? parseInt(limit as string) : ITEMS_PER_PAGE;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const applicants = await applicantRepository.find({
      where: whereClause,
      take: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      relations: ['address', 'socialMediaLinks', 'skills', 'experiences'],
    });

    const viewApplicants = applicants.map(mapApplicantToViewDto);
    const response = {
      totalItems: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      applicants: viewApplicants,
    };

    logger.info('Get all applicants', response);

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.error('Error fetching applicants', error);
    logger.error('Error fetching applicants', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching applicants' });
  }
};
export const createApplicant = async (req: Request, res: Response) => {
  try {
    const applicantRepository = getRepository(Applicant);

    const {
      firstName,
      lastName,
      email,
      summary,
      currentJobTitle,
      address: addressDto,
      socialMediaLinks: socialMediaLinksDto,
      skills: skillsDto,
      experiences: experiencesDto,
    } = req.body as CreateApplicantDto;

    const addressRepository = getRepository(Address);
    const socialMediaLinkRepository = getRepository(SocialMediaLink);
    const skillsRepository = getRepository(Skills);
    const experienceRepository = getRepository(Experience);

    const address = addressRepository.create(addressDto);
    const socialMediaLinks =
      socialMediaLinkRepository.create(socialMediaLinksDto);
    const skills = skillsRepository.create(skillsDto);
    const experience = experienceRepository.create(experiencesDto);

    await addressRepository.save(address);
    await socialMediaLinkRepository.save(socialMediaLinks);
    await skillsRepository.save(skills);
    await experienceRepository.save(experience);

    const newApplicant = applicantRepository.create({
      firstName,
      lastName,
      email,
      summary,
      currentJobTitle,
      address,
      socialMediaLinks,
      skills,
      experience,
    });

    const savedApplicant = await applicantRepository.save(newApplicant);

    logger.info('Created a applicant', savedApplicant);

    return res.status(StatusCodes.CREATED).json(savedApplicant);
  } catch (error) {
    console.error('Error creating applicant', error);
    logger.error('Error creating applicant', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error creating applicant' });
  }
};
export const updateApplicant = async (req: Request, res: Response) => {
  const applicantRepository = getRepository(Applicant);
  const id = Number(req.params.id);
  const updateData = req.body as UpdateApplicantDto;

  if (id === 1) {
    console.error('Can not update this applicant');
    logger.error('Can not update this applicant');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'This applicant can not be updated' });
  }

  let applicant: Applicant;
  try {
    applicant = await applicantRepository.findOneOrFail({
      where: { id },
    });
  } catch (error) {
    console.error('Applicant not found:', error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Applicant not found' });
  }

  if (updateData.address) {
    const address = plainToClass(Address, updateData.address);
    try {
      await validateOrReject(address);
    } catch (errors) {
      console.error('Validation error:', errors);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Bad Request' });
    }
    applicant.address = address;
  }

  if (updateData.socialMediaLinks) {
    const socialMediaLinks = plainToClass(
      SocialMediaLink,
      updateData.socialMediaLinks
    );
    try {
      await validateOrReject(socialMediaLinks);
    } catch (errors) {
      console.error('Validation error:', errors);
      logger.error('Validation error', errors);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Bad Request' });
    }

    applicant.socialMediaLinks = socialMediaLinks.filter(
      (link) => link.url !== undefined
    );
  }

  if (updateData.skills) {
    const skills = plainToClass(Skills, updateData.skills);
    try {
      await validateOrReject(skills);
    } catch (errors) {
      console.error('Validation error:', errors);
      logger.error('Validation error', errors);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Bad Request' });
    }

    applicant.skills = skills.filter((skill) => skill.skillName !== undefined);
  }

  if (updateData.experiences) {
    const experiences = plainToClass(Experience, updateData.experiences);
    try {
      await validateOrReject(experiences);
    } catch (errors) {
      console.error('Validation error:', errors);
      logger.error('Validation error', errors);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Bad Request' });
    }

    applicant.experience = experiences.filter((exp) => exp.title !== undefined);
  }

  // Update the applicant's fields
  const { firstName, lastName, email, summary, currentJobTitle } = req.body;

  if (firstName !== undefined) {
    applicant.firstName = firstName;
  }

  if (lastName !== undefined) {
    applicant.lastName = lastName;
  }

  if (email !== undefined) {
    applicant.email = email;
  }

  if (summary !== undefined) {
    applicant.summary = summary;
  }

  if (currentJobTitle !== undefined) {
    applicant.currentJobTitle = currentJobTitle;
  }

  try {
    const updatedApplicant = await applicantRepository.save(applicant);

    const viewApplicant: ViewApplicantDto = { ...updatedApplicant };

    logger.info('Updated a applicant', viewApplicant);

    return res.status(StatusCodes.OK).json(viewApplicant);
  } catch (error) {
    console.error('Error updating applicant:', error);
    logger.error('Error updating applicant', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error updating applicant' });
  }
};

export const getApplicantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const applicantId = Number(id);
    const applicant = await createQueryBuilder(Applicant, 'applicant')
      .where('applicant.id = :id', { id: applicantId })
      .leftJoinAndSelect('applicant.socialMediaLinks', 'socialMediaLinks')
      .leftJoinAndSelect('applicant.skills', 'skills')
      .leftJoinAndSelect('applicant.experience', 'experience')
      .getOne();

    if (!applicant) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Applicant not found' });
    }

    return res.status(StatusCodes.OK).json(applicant);
  } catch (error) {
    console.error('Error fetching applicant:', error);
    logger.error('Error fetching applicant', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching applicant' });
  }
};

export const deleteApplicant = async (req: Request, res: Response) => {
  const applicantRepository = getRepository(Applicant);
  const id = Number(req.params.id);

  if (id === 1) {
    console.error('Can not delete this applicant');
    logger.error('Can not delete this applicant');
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'This applicant can not be deleted' });
  }

  let applicant: Applicant;
  try {
    applicant = await applicantRepository.findOneOrFail({ where: { id } });
  } catch (error) {
    console.error('Applicant not found:', error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Applicant not found' });
  }

  try {
    await applicantRepository.remove(applicant);
    logger.info('Applicant deleted successfully');
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    console.error('Error deleting applicant:', error);
    logger.error('Error deleting applicant', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error deleting applicant' });
  }
};
