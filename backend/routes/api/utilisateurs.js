import { Router } from "express";
import { getUtilisateurs, createUtilisateur, updateUtilisateur, deleteUtilisateur, deleteAnyUtilisateur } from "../../controllers/api/utilisateurs.js";
import auth from "../../middleware/auth.js";
import estAdministrateur from "../../middleware/estAdministrateur.js";
import estVerifie from "../../middleware/estVerifie.js";

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
router.get("/", auth, estAdministrateur, getUtilisateurs);

/**
 * @route   POST /api/utilisateurs
 * @desc    Créer un utilisateurs
 * @access  Public
 */
router.post("/", createUtilisateur);

/**
 * @route   PUT /api/utilisateurs
 * @desc    Mettre à jour un utilisateur
 * @access  Private
 */
router.put("/", auth, estVerifie, updateUtilisateur);

/**
 * @route   DELETE /api/utilisateurs
 * @desc    Supprimer son compte
 * @access  Private
 */
router.delete("/supprimer", auth, estVerifie, deleteUtilisateur);

/**
 * @route   DELETE /api/utilisateurs/:id
 * @desc    Supprimer un utilisateur
 * @access  Administrateur
 */
router.delete("/:id", auth, estAdministrateur, deleteAnyUtilisateur);

export default router;
