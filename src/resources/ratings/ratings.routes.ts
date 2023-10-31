import { Router } from 'express';
const router = Router();

// Controllers
import { addOne } from './controllers/addOne.js';

// Endpoints
router.post('/create', addOne);

export default router;
