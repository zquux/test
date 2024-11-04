import express from 'express';
import { getSessions, createSession, updateSession, deleteSession, generateReport } from '../controllers/session.controller.js';



const router = express.Router();

router.get("/", getSessions);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);
router.get("/report", generateReport);

export default router;