import express from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/auth/task/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.get('/:id', protect, getTask);
router.patch('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

console.log("Task route loaded");

export default router;