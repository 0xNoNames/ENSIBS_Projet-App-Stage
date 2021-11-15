import { verifierToken, estVerifie, estEtudiant } from "../../middleware/auth.js";
import { postMotivation } from "../../controllers/api/motivation.js";
import { Router } from "express";

const router = Router();

/**
 * @route   GET /api/comptes
 * @desc    Récupérer les motivations
 * @access  Administrateur
 */
//router.get("/", verifierToken, estVerifie, estAdministrateur, getComptes);

/**
 * @route   POST /api/comptes
 * @desc    Upload une lettre de motivation
 * @access  Etudiant,Admin
 */
router.post("/", verifierToken, estVerifie, estEtudiant, postMotivation);

export default router;
