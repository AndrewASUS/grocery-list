import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";



const ItemCard = ({ item, setItems }) => {
    const handleDeleteItem = async (e, id) => {
        e.preventDefault();

        try {
            await api.delete(`/items/${id}`);
            setItems((prev) => prev.filter((item) => item._id !== id));
            toast.success("Item deleted successfully");
        } catch (error) {
            console.log(
                "Error in handleDeleteItem function, itemCard.jsx",
                error
            );
            toast.error("Failed to delete item");
        }
    };



    return (
        <Link
            to={`/item/${item._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-4 border-solid border-[#4E71FF]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{item.entry}</h3>
                <p className="text-base-content/70 line-clamp-3">
                    {item.entry}
                </p>
                <div className="card-actions justify-between items-center mt-4">
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            onClick={(e) => handleDeleteItem(e, item._id)}
                            className="btn btn-ghost btn-xs text-error"
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};


export default ItemCard;
