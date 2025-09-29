import express from "express"
import { unifiedSearch } from "../controllers/search.controller";
const router = express.Router();


router.post("/search" ,unifiedSearch )


export default router ; 