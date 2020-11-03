import express from 'express';
import user from './../components/user/network.user';
const router = express.Router();

router.use('/user', user);

export default router;