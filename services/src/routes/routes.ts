import * as express from "express";
import { userController } from '#root/controller/userController';
import { siteController } from '#root/controller/siteController';
import { clientController } from '#root/controller/clientController';
import { enrollmentController } from '#root/controller/enrollmentController';
import { courseController } from '#root/controller/courseController';

const router = express.Router();

// Users
router.get('/api/v1/users', userController.getAllUsers);
router.post('/api/v1/createNewCompany', userController.createCompanyResolver);
router.post('/api/v1/createNewUser', userController.createUserResolver);
router.post('/api/v1/login', userController.userSessionResolver);

// Sites
router.post('/api/v1/createNewSite', siteController.createSiteResolver);
router.post('/api/v1/getAllSites', siteController.getAllSitesResolver);

// Clients
router.post('/api/v1/createNewClient', clientController.createClientResolver);
router.get('/api/v1/getAllClients', clientController.getAllClientResolver);

// Enrollment
router.post('/api/v1/createNewEnrollment', enrollmentController.createEnrollmentResolver);
router.post('/api/v1/getAllEnrollment', enrollmentController.getAllEnrollmentResolver);

// Course
router.post('/api/v1/createNewCourse', courseController.createCourseResolver);
router.post('/api/v1/getAllCourses', courseController.getAllCourseResolver);


export default router;