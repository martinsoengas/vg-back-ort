import { Router } from 'express';
const router = Router();

// Controllers
import { createOne } from './controllers/createOne.js';
import { getAll } from './controllers/getAll.js';

// Endpoints
router.get('/', getAll);
router.post('/create', createOne);

export default router;
