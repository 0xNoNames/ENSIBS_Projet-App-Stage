import { Router } from "express";
import { getCVs, createCV, updateCV, deleteCV, deleteAnyCV } from "../../controllers/api/cvtheques.js";
import { verifierToken, estEntreprise, estEtudiant, estAdministrateur } from "../../middleware/auth.js";

const router = Router();

/**
 * @route   GET /api/cvs
 * @desc    Récupérer tous les CVs
 * @access  Private
 */
router.get("/", verifierToken, estEntreprise, getCVs);

/**
 * @route   POST /api/cvs
 * @desc    Créer un CV
 * @access  Private
 */
router.post("/", verifierToken, estEtudiant, createCV);

/**
 * @route   PUT /api/cvs
 * @desc    Mettre à jour un CV
 * @access  Private
 */
router.put("/", verifierToken, estEtudiant, updateCV);

/**
 * @route   DELETE /api/cvs
 * @desc    Supprimer son CV
 * @access  Private
 */
router.delete("/supprimer", verifierToken, estEtudiant, deleteCV);

/**
 * @route   DELETE /api/cvs/:id
 * @desc    Supprimer son CV
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estAdministrateur, deleteAnyCV);

export default router;
