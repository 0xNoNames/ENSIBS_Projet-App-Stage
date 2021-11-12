import { Router } from "express";
import { getComptes, createCompte, updateCompte, deleteCompte, deleteAnyCompte, postConnexion, deleteDeconnexion, getValiderCompte, postAideValidation, postAideOublie } from "../../controllers/api/comptes.js";
import { verifierToken, estAdministrateur } from "../../middleware/auth.js";

const router = Router();

/**
 * DEBUG A SUPPRIMER
 */
router.get("/XD", getComptes);

/**
 * @route   GET /api/comptes
 * @desc    Récupérer tous les comptes
 * @access  Administrateur
 */
router.get("/", verifierToken, estAdministrateur, getComptes);

/**
 * @route   POST /api/comptes
 * @desc    Créer un compte
 * @access  Public
 */
router.post("/", verifierToken, createCompte);

/**
 * @route   POST /api/comptes/connexion
 * @desc    Se connecter à son compte
 * @access  Public
 */
router.post("/connexion", verifierToken, postConnexion);

/**
 * @route   DELETE /api/comptes/deconnexion
 * @desc    Se déconnecter de son compte
 * @access  Private
 */
router.delete("/deconnexion", verifierToken, deleteDeconnexion);

/**
 * @route   GET /api/comptes/valider/:id/:token
 * @desc    Valider un compte
 * @access  Public
 */
router.get("/valider/:id/:token", getValiderCompte);

/**
 * @route   POST /api/comptes/aide/validation
 * @desc    Renvoyer le mail de validation du compte
 * @access  Public
 */
router.post("/aide/validation", postAideValidation);

/**
 * @route   POST /api/comptes/aide/oublie
 * @desc    Envoyer le mail de récupération du mot de passe
 * @access  Public
 */
router.post("/aide/oublie", postAideOublie);

/**
 * @route   PUT /api/comptes
 * @desc    Mettre à jour un utilisateur
 * @access  Private
 */
router.put("/", verifierToken, updateCompte);

/**
 * @route   DELETE /api/comptes
 * @desc    Supprimer son compte
 * @access  Private
 */
router.delete("/suppression", verifierToken, deleteCompte);

/**
 * @route   DELETE /api/comptes/:id
 * @desc    Supprimer un utilisateur
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estAdministrateur, deleteAnyCompte);

export default router;
