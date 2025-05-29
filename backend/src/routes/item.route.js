import express from "express"
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/item.controller.js"

const router = express.Router()


// CREATE
router.post("/", createItem)

// READ
router.get("/", getAllItems)

// READ
router.get("/:id", getItemById)

// UPDATE
router.put("/:id", updateItem)

// DELETE
router.delete("/:id", deleteItem)



export default router