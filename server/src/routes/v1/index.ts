import { Router } from 'express';

import Health from './Health';

const router = Router();
router.use('/health', Health);



/**
 * Import and add your routes here
 * Eg:
 *   router.use('/[route-name]', [Route]);
 */

export default router;
