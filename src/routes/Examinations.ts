import express from 'express';
import controller from '../controllers/Examinations';
const router = express.Router();
const statsRouter = express.Router({mergeParams: true});

router.use('/examinations', statsRouter);

router.get('/examinations', controller.getAll);
router.get('/examinations/:locationId', controller.getByLocationId);
statsRouter.get('/stats', controller.getStats);



export = router;