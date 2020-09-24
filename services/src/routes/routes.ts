import * as express from "express";
import { userController } from '#root/controller/userController';
import { siteController } from '#root/controller/siteController';
import { clientController } from '#root/controller/clientController';

const router = express.Router();

// Users
router.get('/api/v1/users', userController.getAllUsers);
router.post('/api/v1/createNewUser', userController.createUserResolver);
router.post('/api/v1/login', userController.userSessionResolver);

// Sites
router.post('/api/v1/createNewSite', siteController.createSiteResolver);
router.post('/api/v1/getAllSites', siteController.getAllSitesResolver);

// Clients
router.post('/api/v1/createNewClient', clientController.createClientResolver);
router.post('/api/v1/getAllClients', clientController.getAllClientResolver);

// Courses


export default router;