import { Router } from "express";

import authAdmin from "../../middleware/authAdmin.js";
import { getSoutenances, createSoutenance, deleteSoutenance, updateSoutenance } from "../../controllers/api/soutenances.js";

const router = Router();

/**
 * @route   GET /api/soutenances
 * @desc    Récupérer toutes les soutenances de stage
 * @access  Private
 */
router.get("/", authAdmin, getSoutenances);

/**
 * @route   POST /api/soutenances
 * @desc    Créer une soutenances de stage
 * @access  Administrateur
 */
router.post("/", authAdmin, createSoutenance);

/**
 * @route   PUT /api/soutenances
 * @desc    Mettre à jour une soutenances de stage
 * @access  Administrateur
 */
router.put("/", authAdmin, updateSoutenance);

/**
 * @route   DELETE /api/soutenances/:id
 * @desc    Supprimer une soutenances de stage
 * @access  Administrateur
 */
router.delete("/:id", authAdmin, deleteSoutenance);

export default router;
