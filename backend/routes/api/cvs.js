import { Router } from "express";
import { getCVs, createCV, updateCV, deleteCV, deleteAnyCV } from "../../controllers/api/cvtheque.js";
import estConnecte from "../../middleware/estConnecte.js";
import estAdministrateur from "../../middleware/estAdministrateur.js";
import estEntreprise from "../../middleware/estEntreprise.js";
import estEtudiant from "../../middleware/estEtudiant.js";

const router = Router();

/**
 * @route   GET /api/cvs
 * @desc    Récupérer tous les CVs
 * @access  Private
 */
router.get("/", estConnecte, estEntreprise, getCVs);

/**
 * @route   POST /api/cvs
 * @desc    Créer un CV
 * @access  Private
 */
router.post("/", estConnecte, estEtudiant, createCV);

/**
 * @route   PUT /api/cvs
 * @desc    Mettre à jour un CV
 * @access  Private
 */
router.put("/", estConnecte, estEtudiant, updateCV);

/**
 * @route   DELETE /api/cvs
 * @desc    Supprimer son CV
 * @access  Private
 */
router.delete("/supprimer", estConnecte, estEtudiant, deleteCV);

/**
 * @route   DELETE /api/cvs/:id
 * @desc    Supprimer son CV
 * @access  Administrateur
 */
router.delete("/:id", estConnecte, estAdministrateur, deleteAnyCV);

export default router;
