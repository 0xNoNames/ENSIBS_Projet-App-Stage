import { Router } from "express";
import {
  getComptes,
  createCompte,
  updateCompteMail,
  updateCompteMotDePasse,
  deleteCompte,
  deleteAnyCompte,
  postCompteConnexion,
  deleteCompteDeconnexion,
  getCompteValider,
  postCompteAideValidation,
  postCompteAideOublie,
  attribuerCompte,
  getAttribuerComptes,
  updateLinkedin
} from "../../controllers/api/comptes.js";
import { verifierToken, estVerifie, estAdministrateur } from "../../middleware/auth.js";

const router = Router();

/**
 * @route   GET /api/comptes
 * @desc    Récupérer tous les comptes
 * @access  Administrateur
 */
router.get("/", verifierToken, estVerifie, estAdministrateur, getComptes);

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
router.post("/connexion", verifierToken, postCompteConnexion);

/**
 * @route   DELETE /api/comptes/deconnexion
 * @desc    Se déconnecter de son compte
 * @access  Private
 */
router.delete("/deconnexion", verifierToken, deleteCompteDeconnexion);

/**
 * @route   GET /api/comptes/valider/:id/:token
 * @desc    Valider un compte
 * @access  Public
 */
router.get("/valider/:id/:token", getCompteValider);

/**
 * @route   POST /api/comptes/aide/validation
 * @desc    Renvoyer le mail de validation du compte
 * @access  Public
 */
router.post("/aide/validation", postCompteAideValidation);

/**
 * @route   POST /api/comptes/aide/oublie
 * @desc    Envoyer le mail de récupération du mot de passe
 * @access  Public
 */
router.post("/aide/oublie", postCompteAideOublie);

/**
 * @route   PUT /api/comptes/mail
 * @desc    Mettre à jour le mail d'un utilisateur
 * @access  Private
 */
router.put("/email", verifierToken, estVerifie, updateCompteMail);

/**
 * @route   PUT /api/comptes/pwd
 * @desc    Mettre à jour le mot de passe d'un utilisateur
 * @access  Private
 */
router.put("/motdepasse", verifierToken, estVerifie, updateCompteMotDePasse);

/**
 * @route   PUT /api/comptes/pwd
 * @desc    Mettre à jour le mot de passe d'un utilisateur
 * @access  Private
 */
router.put("/linkedin", verifierToken, estVerifie, updateLinkedin);

/**
 * @route   DELETE /api/comptes
 * @desc    Supprimer son compte
 * @access  Private
 */
router.delete("/suppression", verifierToken, estVerifie, deleteCompte);

/**
 * @route   DELETE /api/comptes/:id
 * @desc    Supprimer un utilisateur
 * @access  Administrateur
 */
router.delete("/:email", verifierToken, estVerifie, estAdministrateur, deleteAnyCompte);

/**
 * @route   PUT /api/comptes/attribuer
 * @desc    Valider le statut d'un utilisateur
 * @access  Administrateur
 */
router.put("/attribuer/:email", verifierToken, estVerifie, estAdministrateur, attribuerCompte);

/**
 * @route   GET /api/comptes/attribuer
 * @desc    Récupérer les comptes non validés.
 * @access  Administrateur
 */
router.get("/attribuer/", verifierToken, estVerifie, estAdministrateur, getAttribuerComptes);

export default router;
