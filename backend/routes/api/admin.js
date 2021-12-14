import { Router } from "express";
import {postUpdateDateSoutenances,postUpdateJury,postUpdateSalle,putUpdateSalle} from "../../controllers/api/admin.js";
import { verifierToken, estVerifie, estAdministrateur,estEtudiant, estEtudiantEntreprise } from "../../middleware/auth.js";



const router = Router();

/**
 * @route   POST /api/admin/updateDateSoutenances
 * @desc    Changer les dates des soutenances 
 * @access  Administrateur
 */
router.post("/updateDateSoutenances", verifierToken, estVerifie, estAdministrateur, postUpdateDateSoutenances);


/**
 * @route   POST /api/admin/updateJury
 * @desc    Changer les nombres de jury pour les jours de soutenances
 * @access  Administrateur
 */
router.post("/updateJury", verifierToken, estVerifie, estAdministrateur, postUpdateJury);

/**
 * @route   POST /api/admin/createSalle
 * @desc    Creer une nouvelle salle
 * @access  Administrateur
 */
router.post("/createSalle", verifierToken, estVerifie, estAdministrateur, postUpdateSalle);

/**
 * @route   POST /api/admin/updateSalle
 * @desc    Modifier une salle
 * @access  Administrateur
 */
router.put("/updateSalle", verifierToken, estVerifie, estAdministrateur, putUpdateSalle);

export default router;
