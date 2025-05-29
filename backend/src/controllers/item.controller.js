import Item from "../models/item.model.js"



// CREATE CREATE CREATE CREATE CREATE CREATE  
export const createItem = async (req, res) => {
    try {
        const { entry } = req.body
        const item = new Item({
            entry: entry
        })
        const savedItem = await item.save()
        res.status(201).json(savedItem)
    } catch (error) {
        console.log("Error in createItem function, entry.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
} 



// READ READ READ READ READ READ READ READ READ
export const getAllItems = async (_, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }) // Sorted by most recent first
        res.status(200).json(items)
    } catch (error) {
        console.log("Error in getAllItems function, entry.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }  
}



// READ READ READ READ READ READ READ READ READ
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (!item) return res.status(404).json({ message: "Item not found" })

        res.status(200).json(item)
    } catch (error) {
        console.log("Error in getItemById function, entry.controller.js", error)
        res.status(500).json({ message: "Iternal server error" })
    }
}



// UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE 
export const updateItem = async (req, res) => {
    try {
        const { entry } = req.body
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { entry }, { new: true }) // {new: true} will return the new note with updated fields
        if (!updatedItem) return res.status(404).json({ message: "Item not found" })
        
        res.status(200).json(updatedItem)
    } catch (error) {
        console.log("Error in updateItem function, entry.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
}



// DELETE DELETE DELETE DELETE DELETE DELETE 
export const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id)
        if (!deletedItem) return res.status(404).json({ message: "Item not found" })

            res.status(200).json(deletedItem)
    } catch (error) {
        console.log("Error in deleteItem function, entry.controller.js", error)
        res.status(500).json({ message: "Internal server error" })
    }
}