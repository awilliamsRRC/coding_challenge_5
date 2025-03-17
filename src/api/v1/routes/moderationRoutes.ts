import { Router } from "express";
import {
	moderatePost,
	flagUser,
	getPostById,
	getUserProfile,
	getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();
/**
 * @swagger
 * /api/v1/moderation/post/{id}:
 *   get:
 *     summary: "Retrieve a post by ID"
 *     description: "Fetch a specific post by its unique ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *           example: "1234"
 *     responses:
 *       200:
 *         description: "Successfully retrieved post."
 *         content:
 *           application/json:
 *             example:
 *               id: "1234"
 *               content: "This is a post"
 *               userId: "5678"
 *       400:
 *         description: "Invalid ID supplied"
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid ID"
 *               details: "The ID must be a valid post ID."
 *       404:
 *         description: "Post not found"
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 */
router.get("/post/:id", getPostById);
/**
 * @swagger
 * /api/v1/moderation/post/{id}/moderate:
 *   post:
 *     summary: "Moderate a post"
 *     description: "Perform moderation actions on a post (e.g., flag or remove)."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to moderate
 *         schema:
 *           type: string
 *           example: "1234"
 *       - in: body
 *         name: action
 *         required: true
 *         description: Action to take on the post (e.g., flag, remove).
 *         schema:
 *           type: object
 *           properties:
 *             action:
 *               type: string
 *               enum: [flag, remove]
 *               example: "flag"
 *     responses:
 *       200:
 *         description: "Post moderated successfully."
 *         content:
 *           application/json:
 *             example:
 *               message: "Post flagged successfully"
 *       400:
 *         description: "Invalid action supplied"
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid action"
 *               details: "The action must be either 'flag' or 'remove'."
 *       404:
 *         description: "Post not found"
 *         content:
 *           application/json:
 *             example:
 *               error: "Post not found"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 */
router.post("/post/:id/moderate", moderatePost);
/**
 * @swagger
 * /api/v1/moderation/user/{id}/profile:
 *   get:
 *     summary: "Retrieve a user's profile"
 *     description: "Fetch a user’s profile by their unique ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *           example: "5678"
 *     responses:
 *       200:
 *         description: "Successfully retrieved user profile."
 *         content:
 *           application/json:
 *             example:
 *               id: "5678"
 *               username: "john_doe"
 *               flaggedPosts: 5
 *       400:
 *         description: "Invalid ID supplied"
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid user ID"
 *               details: "The user ID must be valid."
 *       404:
 *         description: "User not found"
 *         content:
 *           application/json:
 *             example:
 *               error: "User not found"
 */
router.get("/user/:id/profile", getUserProfile);
/**
 * @swagger
 * /api/v1/moderation/user/{id}/flag:
 *   post:
 *     summary: "Flag a user"
 *     description: "Flag a user for inappropriate behavior."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to flag
 *         schema:
 *           type: string
 *           example: "5678"
 *     responses:
 *       200:
 *         description: "User flagged successfully."
 *         content:
 *           application/json:
 *             example:
 *               message: "User flagged successfully"
 *       400:
 *         description: "Invalid user ID"
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid user ID"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 */
router.post("/user/:id/flag", flagUser);
/**
 * @swagger
 * /api/v1/moderation/content/flags/stats:
 *   get:
 *     summary: "Get flagged content statistics"
 *     description: "Retrieve statistics about flagged content (internal use only)."
 *     responses:
 *       200:
 *         description: "Successfully retrieved statistics."
 *         content:
 *           application/json:
 *             example:
 *               flaggedPosts: 50
 *               flaggedUsers: 10
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 *     tags:
 *       - Internal Use Only
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
