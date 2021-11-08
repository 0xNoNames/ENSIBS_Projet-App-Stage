import { Router } from "express";
import { getOffres, createOffre, updateOffre, deleteOffre } from "../../controllers/api/offres.js";
// import authentification from "../../middleware/authentification.js";
import estConnecte from "../../middleware/estConnecte.js";
import estAdministrateur from "../../middleware/estAdministrateur.js";
import estEtudiant from "../../middleware/estEtudiant.js";

const router = Router();

/**
 * @route   GET /api/offres
 * @desc    Récupérer toutes les offres de stage
 * @access  Etudiant
 */
router.get("/", estConnecte, estEtudiant, getOffres);

/**
 * @route   POST /api/offres
 * @desc    Créer une offre de stage
 * @access  Administrateur
 */
router.post("/", estConnecte, estAdministrateur, createOffre);

/**
 * @route   PUT /api/offres
 * @desc    Mettre à jour une offre de stage
 * @access  Administrateur
 */
router.put("/", estConnecte, estAdministrateur, updateOffre);

/**
 * @route   DELETE /api/offres/:id
 * @desc    Supprimer une offre de stage
 * @access  Administrateur
 */
router.delete("/:id", estConnecte, estAdministrateur, deleteOffre);

export default router;
