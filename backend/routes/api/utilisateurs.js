import { Router } from "express";
import { getUtilisateurs, createUtilisateur, updateUtilisateur, deleteUtilisateur } from "../../controllers/api/utilisateurs.js";
import authAdmin from "../../middleware/authAdmin.js";

const router = Router();


/**
 * DEBUG A SUPPRIMER
 */
router.get("/XD", getUtilisateurs);



/**
 * @route   GET /api/utilisateurs
 * @desc    Récupérer tous les utilisateurs
 * @access  Administrateur
 */
router.get("/", authAdmin, getUtilisateurs);

/**
 * @route   POST /api/utilisateurs
 * @desc    Créer un utilisateurs
 * @access  Administrateur
 */
router.post("/", authAdmin, createUtilisateur);

/**
 * @route   PUT /api/utilisateurs
 * @desc    Mettre à jour un utilisateurs
 * @access  Administrateur
 */
router.put("/", authAdmin, updateUtilisateur);

/**
 * @route   DELETE /api/utilisateurs/:id
 * @desc    Supprimer un utilisateurs
 * @access  Administrateur
 */
router.delete("/:id", authAdmin, deleteUtilisateur);

export default router;