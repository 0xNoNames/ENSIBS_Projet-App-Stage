import { Router } from 'express';
import { getOffres, createOffre, updateOffre, deleteOffre } from "../../controllers/api/offres.js";
import authAdmin from "../../middleware/authAdmin.js";

const router = Router();

/**
 * @route   GET /api/offres
 * @desc    Récupérer toutes les offres de stage
 * @access  Private
 */
router.get('/', authAdmin, getOffres);

/**
 * @route   POST /api/offres
 * @desc    Créer une offre de stage
 * @access  Administrateur
 */
router.post('/', authAdmin, createOffre);

/**
 * @route   PUT /api/offres
 * @desc    Mettre à jour une offre de stage
 * @access  Administrateur
 */
router.put('/', authAdmin, updateOffre);

/**
 * @route   DELETE /api/offres/:id
 * @desc    Supprimer une offre de stage
 * @access  Administrateur
 */
router.delete('/:id', authAdmin, deleteOffre);

export default router;
