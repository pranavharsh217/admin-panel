import express from 'express';
import { registerUser, removeUser, updateUsers ,getUserById,getAllUsers} from '../controllers/form.controllers.js';

const router = express.Router();
router.route('/add').post(registerUser);
router.route('/remove/:id').delete(removeUser);
router.route('/update/:id').put(updateUsers);
router.route('/getall').get(getAllUsers);
router.route('/getById').get(getUserById);
export default router;