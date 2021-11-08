import { Router } from "express";
import { getCVs, createCV, updateCV, deleteCV, deleteAnyCV } from "../../controllers/api/cvtheque.js";
import auth from "../../middleware/auth.js";

const router = Router();

/**
 * @route   GET /api/cvs
 * @desc    Récupérer tous les CVs
 * @access  Private
 */
router.get("/", auth.verifierToken, auth.estEntreprise, getCVs);

/**
 * @route   POST /api/cvs
 * @desc    Créer un CV
 * @access  Private
 */
router.post("/", auth.verifierToken, auth.estEtudiant, createCV);

/**
 * @route   PUT /api/cvs
 * @desc    Mettre à jour un CV
 * @access  Private
 */
router.put("/", auth.verifierToken, auth.estEtudiant, updateCV);

/**
 * @route   DELETE /api/cvs
 * @desc    Supprimer son CV
 * @access  Private
 */
router.delete("/supprimer", auth.verifierToken, auth.estEtudiant, deleteCV);

/**
 * @route   DELETE /api/cvs/:id
 * @desc    Supprimer son CV
 * @access  Administrateur
 */
router.delete("/:id", auth.verifierToken, auth.estAdministrateur, deleteAnyCV);

export default router;
