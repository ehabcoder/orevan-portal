import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  loginWithGoogle,
  authWithEmail,
  // getUserById,
  // updateUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// login user
router.post("/login", authUser);
router.post("/authWithEmail", authWithEmail);

router.post("/loginWithGoogle", loginWithGoogle);

// only super admin can register new user
router.route("/").post(registerUser);

// get and edit the current user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
