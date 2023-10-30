import { Router } from 'express';
const router = Router();

// Controllers
import { getAll } from './controllers/getAll.js';
import { createOne } from './controllers/createOne.js';
import { getByID } from './controllers/getByID.js';
import { updateOneByID } from './controllers/updateOneByID.js';
import { deleteOneByID } from './controllers/deleteOneByID.js';

// Endpoints
router.get('/', getAll);
router.get('/:id', getByID);
router.post('/create', createOne);
router.put('/update/:id', updateOneByID);
router.delete('/delete/:id', deleteOneByID);

export default router;
