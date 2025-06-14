import express from 'express'
import * as brainController from '../controller/brainController'
import {verifyToken, verifyCookie} from '../middlewares/authMiddleware'


const Router = express.Router;
export const brainRouter = Router();

// brainRouter.get('/brains', verifyToken, brainController.getBrains);

// brainRouter.post('/brain', verifyToken, brainController.createBrain);

// brainRouter.put('/brain', verifyToken, brainController.updateBrain);

// brainRouter.delete('/brain', verifyToken, brainController.deleteBrain);

brainRouter.get('/brains', verifyCookie, brainController.getBrains);

brainRouter.post('/brain', verifyCookie, brainController.createBrain);

brainRouter.put('/brain', verifyCookie, brainController.updateBrain);

brainRouter.delete('/brain', verifyCookie, brainController.deleteBrain);