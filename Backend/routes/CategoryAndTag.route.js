import express from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";
import { createCategory, deleteCategory, getCategories } from "../controllers/category.controller";
import { createTag, deleteTag, getTags } from "../controllers/Tags.controller";
const router = express.Router();



router.post("/categories" , authMiddleware , authorizeRoles("admin" , "editor") , createCategory);
router.get("/categories" , getCategories);
router.delete("/categories/:id" , authMiddleware , authorizeRoles("admin") , deleteCategory)



router.post("/tags" , authMiddleware , authorizeRoles("admin" , "editor") , createTag);
router.get("/tags" , getTags);
router.delete("/tags/:id" , authMiddleware , authorizeRoles("admin") , deleteTag)

export default router ; 