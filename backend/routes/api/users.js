import { Router } from "express";

import auth from "../../middleware/auth.js";
import User from "../../models/utilisateur.js";

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("Pas d'utilisateurs.");
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
