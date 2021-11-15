import { verifierToken, estVerifie, estEtudiant,estElevePropre } from "../../middleware/auth.js";
import { postMotivation,getUniqueMotivation } from "../../controllers/api/motivation.js";
import { Router } from "express";

const router = Router();

/**
 * @route   GET /api/motivation
 * @desc    Récupérer les motivations
 * @access  Administrateur
 */
//router.get("/", verifierToken, estVerifie, estAdministrateur, getComptes);

/**
 * @route   GET /api/motivation
 * @desc    Récupérer les motivations
 * @access  Administrateur
 */
router.get("/:id", verifierToken, estVerifie, estElevePropre, getUniqueMotivation);


/**
 * @route   POST /api/motivation
 * @desc    Upload une lettre de motivation
 * @access  Etudiant,Admin
 */
router.post("/", verifierToken, estVerifie, estEtudiant, postMotivation);

export default router;
