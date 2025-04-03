import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getSocialProfiles,
  updateSocialProfiles,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* SOCIAL PROFILES */
router.get("/:id/social-profiles", verifyToken, getSocialProfiles);
router.patch("/:id/social-profiles", verifyToken, updateSocialProfiles);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
