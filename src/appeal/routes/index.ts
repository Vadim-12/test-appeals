import { Router } from 'express';
import { AppealController } from '../controllers';

const router = Router();
const appealController = new AppealController();

router.post('/appeals', appealController.createAppeal);
router.patch('/appeals/:id/take', appealController.takeAppeal);
router.patch('/appeals/:id/complete', appealController.completeAppeal);
router.patch('/appeals/:id/cancel', appealController.cancelAppeal);
router.get('/appeals', appealController.getAppeals);
router.post(
	'/appeals/cancel-all-in-progress',
	appealController.cancelAllInProgress
);

export default router;
