import { Router } from "express";
import { postContactMail } from "../../controllers/api/contact.js";

const router = Router();

/**
 * @route   POST /api/contact/
 * @desc    Envoyer le mail de contact
 * @access  Public
 */
router.post("/", postContactMail);

export default router;
