import { Router } from 'express';
// import UserRouter from './Users';
import applicantRouter from './applicants.route';

// Init router and path
const router = Router();

router.use(applicantRouter);

// Add sub-routes
// router.use('/users', UserRouter);

// Export the base-router
export default router;
