import express from 'express';
import authentication from '../controllers/auth';

const router = express.Router();

// SIGN-UP
router.post('/signup', authentication.signUp);

// SIGN IN
router.post('/signin', authentication.signIn);

module.exports = router;