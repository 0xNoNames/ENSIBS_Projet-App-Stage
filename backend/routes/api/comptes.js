import { Router } from "express";
import { getComptes, createCompte, updateCompte, deleteCompte, deleteAnyCompte, postConnexion, deleteDeconnexion } from "../../controllers/api/comptes.js";
import { verifierToken, estAdministrateur } from "../../middleware/auth.js";

const router = Router();

/**
 * DEBUG A SUPPRIMER
 */
router.get("/XD", getComptes);

/**
 * @route   GET /api/utilisateurs
 * @desc    Récupérer tous les utilisateurs
 * @access  Administrateur
 */
router.get("/", verifierToken, estAdministrateur, getComptes);

/**
 * @route   POST /api/utilisateurs
 * @desc    Créer un utilisateurs
 * @access  Public
 */
router.post("/", verifierToken, createCompte);

router.post("/connexion", verifierToken, postConnexion);

router.delete("/deconnexion", verifierToken, deleteDeconnexion);

/**
 * @route   PUT /api/utilisateurs
 * @desc    Mettre à jour un utilisateur
 * @access  Private
 */
router.put("/", verifierToken, updateCompte);

/**
 * @route   DELETE /api/utilisateurs
 * @desc    Supprimer son compte
 * @access  Private
 */
router.delete("/suppression", verifierToken, deleteCompte);

/**
 * @route   DELETE /api/utilisateurs/:id
 * @desc    Supprimer un utilisateur
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estAdministrateur, deleteAnyCompte);

export default router;
