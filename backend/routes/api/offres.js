import { Router } from "express";
import { getOffres, createOffre, updateOffre, deleteOffre, validateOffre,getOffreUnique } from "../../controllers/api/offres.js";
import { verifierToken, estEtudiant, estAdministrateur, estVerifie } from "../../middleware/auth.js";
const router = Router();

/**
 * @route   GET /api/offres
 * @desc    Récupérer toutes les offres de stage
 * @access  Etudiant
 */
router.get("/", verifierToken, estVerifie, estEtudiant, getOffres);

/**
 * @route   GET /api/offres
 * @desc    Récupérer une offre de stage unqiue 
 * @access  Etudiant
 */
router.get("/:id", verifierToken, estVerifie, estEtudiant, getOffreUnique);

/**
 * @route   POST /api/offres
 * @desc    Créer une offre de stage
 * @access  Administrateur
 */
router.post("/", verifierToken, estVerifie, estAdministrateur, createOffre);

/**
 * @route   PUT /api/offres
 * @desc    Mettre à jour une offre de stage
 * @access  Administrateur
 */
router.put("/", verifierToken, estVerifie, estAdministrateur, updateOffre);

/**
 * @route   PUT /api/offres/validate/:id
 * @desc    Validation d'une offre
 * @access  Administrateur
 */
router.put("/validate/:id", verifierToken, estVerifie, estAdministrateur, validateOffre);

/**
 * @route   DELETE /api/offres/:id
 * @desc    Supprimer une offre de stage
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estVerifie, estAdministrateur, deleteOffre);

export default router;
