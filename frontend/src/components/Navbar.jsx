import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
    return (
        <header className="bg-error-content/50 border-b border-base-content/30">
            <div className="mx-auto max-w-7xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-blue-400 font-mono tracking-tight">
                        Groceries
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link
                            to={"/create"}
                            className="btn btn-info rounded-md"
                        >
                            <PlusIcon className="size-5" />
                            <span>New Item</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
