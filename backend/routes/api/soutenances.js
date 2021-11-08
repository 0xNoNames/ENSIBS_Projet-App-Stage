import { Router } from "express";
import { getSoutenances, createSoutenance, deleteSoutenance, updateSoutenance } from "../../controllers/api/soutenances.js";
import auth from "../../middleware/auth.js";


const router = Router();

/**
 * @route   GET /api/soutenances
 * @desc    Récupérer toutes les soutenances de stage
 * @access  Etudiant
 */
router.get("/", auth.verifierToken, auth.estEtudiant, getSoutenances);

/**
 * @route   POST /api/soutenances
 * @desc    Créer une soutenances de stage
 * @access  Private
 */
router.post("/", auth.verifierToken, auth.estVerifie, createSoutenance);

/**
 * @route   PUT /api/soutenances
 * @desc    Mettre à jour une soutenances de stage
 * @access  Private
 */
router.put("/", auth.verifierToken, auth.estVerifie, updateSoutenance);

/**
 * @route   DELETE /api/soutenances/:id
 * @desc    Supprimer une soutenances de stage
 * @access  Verified
 */
router.delete("/:id", auth.verifierToken, auth.estVerifie, deleteSoutenance);

export default router;
