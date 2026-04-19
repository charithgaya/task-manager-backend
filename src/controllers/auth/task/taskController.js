import asyncHandler from "express-async-handler";
import taskModel  from "../../../models/auth/tasks/taskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const {title, description, dueDate, priority, status} = req.body;
   
    if(!title || title.trim() === ""){
        return res.status(400).json({ message: "Title is required!" });    
    }

    if(!description || description.trim() === ""){
        return res.status(400).json({ message: "Description is required!" });    
    }

    const task = new taskModel({
        title,
        description,
        dueDate,
        priority,
        status,
        user: req.user._id,
    });

    await task.save();
    // Logic to create a new task
    return res.status(201).json(task);
    
  } catch (error) {
      console.log("Error creating task: ", error);
      return res.status(500).json({ message: error.message });
    }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if(!userId){
        return res.status(400).json({ message: "User not found!" });    
    }

    const tasks = await taskModel.find({ user: userId });
    return res.status(200).json(tasks);

  } catch (error) {
    console.log("Error fetching tasks: ", error);
    return res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: "Please provide task id!" });    
    }

    const task = await taskModel.findById(id);

    if(!task){
        return res.status(404).json({ message: "Task not found!" });    
    }

    if(!task.user.equals(userId)){
        return res.status(401).json({ message: "Not authorized to access this task!" });
    }

    return res.status(200).json(task);
    } catch (error) {
        console.log("Error getting task: ", error);
        return res.status(500).json({ message: error.message });
    }
});

export const updateTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; 
        const { title, description, dueDate, priority, status, completed } = req.body;
        const task = await taskModel.findById(id);
        
        if(!id){
            return res.status(400).json({ message: "Please provide task id!" });    
        }
        if(!task){
            return res.status(404).json({ message: "Task not found!" });    
        }

        // Check if the task belongs to the user
        if(!task.user.equals(userId)){
            return res.status(401).json({ message: "Not authorized to update this task!" });
        }

        // Update task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed !== undefined ? completed : task.completed;
        
        await task.save();
        return res.status(200).json(task);

    } catch (error) {
        console.log("Error updating task: ", error);
        return res.status(500).json({ message: error.message });
    }
});

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const task = await taskModel.findById(id);

        if(!id){
            return res.status(400).json({ message: "Please provide task id!" });    
        }

        if(!task){
            return res.status(404).json({ message: "Task not found!" });    
        }

        // Check if the task belongs to the user
        if(!task.user.equals(userId)){
            return res.status(401).json({ message: "Not authorized to delete this task!" });
        }

        await taskModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully!" });

    } catch (error) {
        console.log("Error deleting task: ", error);
        return res.status(500).json({ message: error.message });
    }
});