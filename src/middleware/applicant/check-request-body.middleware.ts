import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addressIsValid = (address: any): boolean => {
  if (
    address &&
    typeof address.street === 'string' &&
    typeof address.city === 'string' &&
    typeof address.state === 'string' &&
    typeof address.zip === 'string' &&
    address.street.trim() !== '' &&
    address.city.trim() !== '' &&
    address.state.trim() !== '' &&
    address.zip.trim() !== ''
  ) {
    return true;
  }
  return false;
};

export const checkRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, summary, currentJobTitle } = req.body;
  const address = req.body.address;
  const socialMediaLinks = req.body.socialMediaLinks;
  const skills = req.body.skills;
  const experiences = req.body.experiences;

  if (
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string' ||
    typeof currentJobTitle !== 'string' ||
    typeof summary !== 'string' ||
    !Array.isArray(socialMediaLinks) ||
    !Array.isArray(skills) ||
    !Array.isArray(experiences) ||
    !addressIsValid(address)
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request body' });
  }

  next();
};
