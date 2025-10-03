import express from "express";
import { unifiedSearch } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/search", unifiedSearch);

export default router;
