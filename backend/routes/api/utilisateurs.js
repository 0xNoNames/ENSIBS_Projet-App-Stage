import { Router } from "express";
import { getUtilisateurs, createUtilisateur, updateUtilisateur, deleteUtilisateur, deleteAnyUtilisateur } from "../../controllers/api/utilisateurs.js";
import estAdministrateur from "../../middleware/estAdministrateur.js";
import estConnecte from "../../middleware/estConnecte.js";
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
router.get("/", estConnecte, estAdministrateur, getUtilisateurs);

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
router.put("/", estConnecte, estVerifie, updateUtilisateur);

/**
 * @route   DELETE /api/utilisateurs
 * @desc    Supprimer son compte
 * @access  Private
 */
router.delete("/supprimer", estConnecte, estVerifie, deleteUtilisateur);

/**
 * @route   DELETE /api/utilisateurs/:id
 * @desc    Supprimer un utilisateur
 * @access  Administrateur
 */
router.delete("/:id", estConnecte, estAdministrateur, deleteAnyUtilisateur);

export default router;
