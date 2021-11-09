import { Router } from "express";
import { getUtilisateurs, createUtilisateur, updateUtilisateur, deleteUtilisateur, deleteAnyUtilisateur, postConnexion, postInscription, deleteDeconnexion } from "../../controllers/api/utilisateurs.js";
import { verifierToken, estVerifie, estAdministrateur } from "../../middleware/auth.js";

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
router.get("/", verifierToken, estAdministrateur, getUtilisateurs);

/**
 * @route   POST /api/utilisateurs
 * @desc    Créer un utilisateurs
 * @access  Public
 */
router.post("/", createUtilisateur);

router.post("/connexion", verifierToken, postConnexion);

router.post("/inscription", verifierToken, postInscription);

router.delete("/deconnexion", verifierToken, deleteDeconnexion);

/**
 * @route   PUT /api/utilisateurs
 * @desc    Mettre à jour un utilisateur
 * @access  Private
 */
router.put("/", verifierToken, estVerifie, updateUtilisateur);

/**
 * @route   DELETE /api/utilisateurs
 * @desc    Supprimer son compte
 * @access  Private
 */
router.delete("/supprimer", verifierToken, estVerifie, deleteUtilisateur);

/**
 * @route   DELETE /api/utilisateurs/:id
 * @desc    Supprimer un utilisateur
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estAdministrateur, deleteAnyUtilisateur);

export default router;
