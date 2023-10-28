import express from "express";
import { addUser,getUsers,deleteUser,getUser,editUser,RegisterUser,SignInUser} from '../controller/UserController.js';
import { SearchStaff } from "../controller/UserController.js";
import { getSalary } from "../controller/UserController.js";
// import { generateResetToken, sendPasswordResetEmail, resetPassword } from '../controller/forgotPasswordController.js';

const router = express.Router();

// Generate reset token and send email to user
// router.post('/forgot-password', generateResetToken, sendPasswordResetEmail);
// Verify reset token and reset user's password
// router.post('/reset-password/:token', resetPassword);

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
