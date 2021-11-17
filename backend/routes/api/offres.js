import { Router } from "express";
import { getOffres, createOffre, updateOffre, deleteOffre, updateAnyOffre, validateOffre, getOffre } from "../../controllers/api/offres.js";
import { verifierToken, estEtudiant, estAdministrateur, estVerifie, estEntreprise } from "../../middleware/auth.js";
const router = Router();

/**
 * @route   GET /api/offres
 * @desc    Récupérer toutes les offres de stage
 * @access  Etudiant
 */
router.get("/", verifierToken, estVerifie, estEtudiant, getOffres);

/**
 * @route   GET /api/offres/:id
 * @desc    Récupérer une offre de stage
 * @access  Etudiant
 */
router.get("/:id", verifierToken, estVerifie, estEtudiant, getOffre);

/**
 * @route   POST /api/offres
 * @desc    Créer une offre de stage
 * @access  Administrateur
 */
router.post("/", verifierToken, estVerifie, estEntreprise, createOffre);

/**
 * @route   PUT /api/offres/:id
 * @desc    Mettre à jour une offre de stage
 * @access  Administrateur
 */
router.put("/:id", verifierToken, estVerifie, estAdministrateur, updateAnyOffre);

/**
 * @route   PUT /api/offres/validate/:id
 * @desc    Validation d'une offre
 * @access  Administrateur
 */
router.put("/validate/:id", verifierToken, estVerifie, estAdministrateur, validateOffre);

/**
 * @route   DELETE /api/offres/:id
 * @desc    Supprimer une offre de stage
 * @access  Entreprise
 */
router.delete("/:id", verifierToken, estVerifie, estEntreprise, deleteOffre);

/**
 * @route   PUT /api/offres
 * @desc    Mettre à jour son offre de stage
 * @access  Entreprise
 */
router.put("/", verifierToken, estVerifie, estEntreprise, updateOffre);

export default router;
