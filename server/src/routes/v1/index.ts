import { Router } from 'express';

import Health from './Health';
import users from './Users';
import auth from './Auth';

const router = Router();
router.use('/health', Health);

router.use('/auth', auth)
router.use('/users', users);

/**
 * Import and add your routes here
 * Eg:
 *   router.use('/[route-name]', [Route]);
 */

export default router;
