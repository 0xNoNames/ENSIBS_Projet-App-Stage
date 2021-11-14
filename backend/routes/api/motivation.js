import {getMotivation} from "../../controllers/api/motivation.js";
import { Router } from "express";
import { verifierToken, estVerifie, estAdministrateur,estEtudiant } from "../../middleware/auth.js";

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
router.post("/", verifierToken, estVerifie, estEtudiant, getMotivation);



export default router;