import auth from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", auth, (req, res) => {
  try {
    res.render("pages/offres", {
      estConnecte: true,
      page: "offres",
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;
