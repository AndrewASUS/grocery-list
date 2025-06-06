import mongoose from "mongoose"


const itemSchema = new mongoose.Schema(
    {
        entry: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)


const Item = mongoose.model("Item", itemSchema)


export default Item