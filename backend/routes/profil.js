import { Router } from "express";
import path from "path";

import auth from "../middleware/auth.js";

const router = Router();
const __dirname = path.resolve("./");

router.get("/", auth, (req, res) => {
  res.sendFile(__dirname + "/frontend/profil.html");
});

export default router;
