import { Router } from "express";
import path from 'path';

const router = Router();
const __dirname = path.resolve("./");

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/inscription.html");
});

export default router;