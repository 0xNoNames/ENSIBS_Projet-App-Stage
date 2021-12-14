import { getAdminPage } from "../../controllers/routing/admin.js";
import { verifierToken, estVerifie } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, getAdminPage);

export default router;