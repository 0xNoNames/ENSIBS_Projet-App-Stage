import { Router } from "express";
import { getOffres, createOffre, updateOffre, deleteOffre } from "../../controllers/api/offres.js";
import { verifierToken, estEtudiant, estAdministrateur } from "../../middleware/auth.js";
const router = Router();

/**
 * @route   GET /api/offres
 * @desc    Récupérer toutes les offres de stage
 * @access  Etudiant
 */
router.get("/", verifierToken, estEtudiant, getOffres);

/**
 * @route   POST /api/offres
 * @desc    Créer une offre de stage
 * @access  Administrateur
 */
router.post("/", verifierToken, estAdministrateur, createOffre);

/**
 * @route   PUT /api/offres
 * @desc    Mettre à jour une offre de stage
 * @access  Administrateur
 */
router.put("/", verifierToken, estAdministrateur, updateOffre);

/**
 * @route   DELETE /api/offres/:id
 * @desc    Supprimer une offre de stage
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estAdministrateur, deleteOffre);

export default router;
