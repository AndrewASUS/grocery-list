import { NotebookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ItemsNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">All Items Purchased</h3>
            <p className="text-base-content/70 text-2xl">
                Set a reminder to pick up an item later
            </p>
            <Link to="/create" className="btn btn-primary text-2xl">
                Add to list
            </Link>
        </div>
    );
};

export default ItemsNotFound;
