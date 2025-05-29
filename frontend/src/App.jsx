import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ItemPage from "./pages/ItemPage";

function App() {
    return (
        <>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                </Routes>
        </>
    );
}

export default App;
