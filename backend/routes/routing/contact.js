import { Router } from "express";
import { verifierToken } from "../../middleware/auth.js";
import { getContactPage } from "../../controllers/routing/contact.js";

const router = Router();

router.get("/", verifierToken, getContactPage);

export default router;
