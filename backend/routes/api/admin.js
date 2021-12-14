import { Router } from "express";
import {postUpdateDateSoutenances} from "../../controllers/api/admin.js";
import { verifierToken, estVerifie, estAdministrateur,estEtudiant, estEtudiantEntreprise } from "../../middleware/auth.js";



const router = Router();

/**
 * @route   POST /api/admin/updateDateSoutenances
 * @desc    Changer les dates des soutenances 
 * @access  Administrateur
 */
router.post("/updateDateSoutenances", verifierToken, estVerifie, estAdministrateur, postUpdateDateSoutenances);


export default router;
