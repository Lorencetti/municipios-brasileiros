import { Router } from 'express';
import { MunicipioController } from '../controllers/municipioController';

const router = Router();

router.get('/', MunicipioController.getAll);
router.get('/buscar', MunicipioController.search);
router.get('/populacao/min', MunicipioController.byMinPop);
router.get('/populacao/entre', MunicipioController.byPopRange);
router.get('/capital-nao-populosa', MunicipioController.capitalNaoMaisPop);
router.get('/top10-nao-capitais', MunicipioController.top10NaoCapitais);
// This file defines the routes for municipio-related endpoints.
// It uses the MunicipioController to handle requests and responses.

export default router;