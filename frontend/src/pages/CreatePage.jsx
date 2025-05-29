import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
    const [loading, setLoading] = useState(false);
    const [entry, setEntry] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!entry) {
            toast.error("Please add item to groceries list");
            return;
        }

        setLoading(true);
        try {
            await api.post("/items", {
                entry,
            });
            toast.success("Item added successfully");
            navigate("/");
        } catch (error) {
            console.log("Error in handleSubmit function, error", error);
            toast.error("Error adding item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto border-4 border-solid border-[#4E71FF] rounded-md">
                    <Link to={"/"} className="btn btn-ghost m-6 ">
                        <ArrowLeftIcon className="size-5" />
                        Back to grocery list
                    </Link>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Create New Item
                            </h2>
                            <form onSubmit={handleSubmit} className="">
                                <div className="form-control mb-4">
                                    <input
                                        type="text"
                                        placeholder="Add an item to your groceries list..."
                                        className="input input-bordered"
                                        value={entry}
                                        onChange={(e) =>
                                            setEntry(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-info"
                                        disabled={loading}
                                    >
                                        {loading ? "Adding..." : "Add Item"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
