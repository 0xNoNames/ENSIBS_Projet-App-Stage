import { Router } from "express";
import { getCVs, createCV, updateCV, deleteCV, deleteAnyCV, getCV } from "../../controllers/api/cvtheques.js";
import { verifierToken, estVerifie, estEntreprise, estEtudiant, estAdministrateur, estElevePropre } from "../../middleware/auth.js";

const router = Router();

/**
 * @route   GET /api/cvs
 * @desc    Récupérer tous les CVs
 * @access  Private
 */
router.get("/", verifierToken, estVerifie, estEntreprise, getCVs);

/**
 * @route GET /api/cvs/:id
 * @desc Recupérer le CV associé à l'id
 * @acces Private
 */
router.get("/:id", verifierToken, estVerifie, estElevePropre, getCV);

/**
 * @route   POST /api/cvs
 * @desc    Créer un CV
 * @access  Private
 */
router.post("/", verifierToken, estVerifie, estEtudiant, createCV);

/**
 * @route   PUT /api/cvs
 * @desc    Mettre à jour un CV
 * @access  Private
 */
router.put("/", verifierToken, estVerifie, estEtudiant, updateCV);

/**
 * @route   DELETE /api/cvs
 * @desc    Supprimer son CV
 * @access  Private
 */
router.delete("/supprimer", verifierToken, estVerifie, estEtudiant, deleteCV);

/**
 * @route   DELETE /api/cvs/:id
 * @desc    Supprimer un CV
 * @access  Administrateur
 */
router.delete("/:id", verifierToken, estAdministrateur, deleteAnyCV);

export default router;
