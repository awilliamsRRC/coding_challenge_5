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
 * /post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: Post not found
 */
router.get("/post/:id", getPostById);
/**
 * @swagger
 * /post/{id}/moderate:
 *   post:
 *     summary: Moderate a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to moderate
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *       400:
 *         description: Invalid request or post moderation failed
 */
router.post("/post/:id/moderate", moderatePost);
/**
 * @swagger
 * /user/{id}/profile:
 *   get:
 *     summary: Get user profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve profile for
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                 bio:
 *                   type: string
 *                   description: A brief bio of the user
 *                 isFlagged:
 *                   type: boolean
 *                   description: Whether the user has been flagged
 *                 joinedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time when the user joined
 *                 postsCount:
 *                   type: integer
 *                   description: The number of posts made by the user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/user/:id/profile", getUserProfile);
/**
 * @swagger
 * /user/{id}/flag:
 *   post:
 *     summary: Flag a user for violating rules
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to flag
 *       - in: body
 *         name: reason
 *         description: The reason for flagging the user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             reason:
 *               type: string
 *               description: Reason for flagging the user (e.g., "Spam")
 *     responses:
 *       200:
 *         description: User flagged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user flagged
 *                 reason:
 *                   type: string
 *                   description: The reason why the user was flagged
 *                 flaggedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time when the user was flagged
 *       400:
 *         description: Invalid request or flagging failed
 *       500:
 *         description: Internal server error
 */
router.post("/user/:id/flag", flagUser);
/**
 * @swagger
 * /content/flags/stats:
 *   get:
 *     summary: Get statistics on flagged content
 *     responses:
 *       200:
 *         description: Flagged content statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFlaggedPosts:
 *                   type: integer
 *                   description: Total number of flagged posts
 *                 totalFlaggedUsers:
 *                   type: integer
 *                   description: Total number of flagged users
 *                 mostCommonFlagReason:
 *                   type: string
 *                   description: The most common reason for flagging content
 *                 flaggedContentByCategory:
 *                   type: object
 *                   description: A breakdown of flagged content by category
 *                   additionalProperties:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
