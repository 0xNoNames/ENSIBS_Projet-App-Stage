import { Router } from "express";
import estConnecte from "../../middleware/estConnecte.js";

const router = Router();

router.get("/", (req, res) => {
  estConnecte(req, res).then((data) => {
    res.render("pages/contact", {
      estConnecte: data,
      page: "contact",
    });
  });
});

export default router;
