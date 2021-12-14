import { Router } from "express";
import {postUpdateContraintes} from "../../controllers/api/contraintes.js";
import { verifierToken, estVerifie,estEnseignant } from "../../middleware/auth.js";



const router = Router();

/**
 * @route   POST /api/admin/updateDateSoutenances
 * @desc    Changer les dates des soutenances 
 * @access  Administrateur
 */
router.post("/updateContraintes", verifierToken, estEnseignant, postUpdateContraintes);

export default router;
