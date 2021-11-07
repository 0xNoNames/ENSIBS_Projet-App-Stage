import auth from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", auth, (req, res) => {
  res.render("pages/cvtheque", {
    estConnecte: true,
    page: "cvtheque",
  });
});

export default router;
