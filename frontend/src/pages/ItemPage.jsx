import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ItemPage = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await api.get(`/items/${id}`);
                setItem(res.data);
            } catch (error) {
                console.log("Error in fetchNote function, ItemPage.jsx", error);
                toast.error("Error fetching item");
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleSave = async () => {
        if (!item.entry.trim()) {
            toast.error("Please fill in filed to update item");
            return;
        }
        setSaving(true);

        try {
            await api.put(`/items/${id}`, item);
            toast.success("Item saved successfully");
            navigate("/");
        } catch (error) {
            console.log("Error in handleSave, ItemPage.jsx", error);
            toast.error("Errir saving item");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/items/${id}`);
            toast.success("Item deleted successfully");
            navigate("/");
        } catch (error) {
            console.log("Error in handleDelete function, ItemPage.jsx", error);
            toast.error("Failed to delete item");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Groceries
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-outline"
                        >
                            <Trash2Icon className="h-5 w-5" />
                            Delete Item
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Update grocery item</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Update grocery item"
                                    className="input input-bordered"
                                    value={item.entry}
                                    onChange={(e) =>
                                        setItem({
                                            ...item,
                                            entry: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    disabled={saving}
                                    onClick={handleSave}
                                >
                                    {saving ? "Saving..." : "Save Cahnges"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
