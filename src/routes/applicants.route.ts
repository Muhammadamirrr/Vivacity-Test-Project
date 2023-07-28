import { Router } from 'express';
import {
  getApplicants,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  getApplicantById,
  getPersonalData,
} from '../controllers/applicants.controller';
import { checkParamType } from '../middleware/applicant/check-param-type.middleware';
import { checkRequestBody } from '../middleware/applicant/check-request-body.middleware';

const router = Router();

router.get('/applicants', getApplicants);
router.post('/applicants', checkRequestBody, createApplicant);
router.put(
  '/applicants/:id',
  checkParamType,
  checkRequestBody,
  updateApplicant
);
router.get('/applicants/:id', checkParamType, getApplicantById);
router.delete('/applicants/:id', checkParamType, deleteApplicant);

// main route
router.get('/awesome/applicant', getPersonalData);

export default router;
