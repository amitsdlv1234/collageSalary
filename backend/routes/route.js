import express from "express";
import { addUser,getUsers,deleteUser,getUser,editUser,RegisterUser,SignInUser} from '../controller/UserController.js';
import { SearchStaff } from "../controller/UserController.js";
import { getSalary } from "../controller/UserController.js";
const router = express.Router();


router.post('/staffSalary/staffDash/:id',getSalary);
router.post('/signin',SignInUser);
router.post('/register',RegisterUser);
router.post('/data-entry/:year/:month', addUser);
router.get('/all/admin/:year/:month', getUsers);
router.get('/:id/:year/:month', getUser);
router.put('/:id/:year/:month', editUser);
router.delete('/:id/:month/:year', deleteUser);
router.delete('/:search', SearchStaff);
// router.post('/Student', getStudent);
export default router;
