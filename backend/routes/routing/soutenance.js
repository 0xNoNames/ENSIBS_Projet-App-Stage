import auth from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", auth, (req, res) => {
  res.render("pages/soutenances", {
    estConnecte: true,
    page: "soutenances",
  });
});

export default router;
