import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";


function DevicesList() {
    const {
        products,
        search, setSearch,
        compareList, toggleCompare,
    } = useGlobalContext();

    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");


    const categories = ["all", ...Array.from(new Set(
        products
            .map(p => p.category)
            .filter(cat => typeof cat === "string" && cat.trim() !== "")
    ))];


    let filteredProducts = products;
    if (category !== "all") {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (search.trim() !== "") {
        filteredProducts = filteredProducts.filter(p =>
            (p.title || "").toLowerCase().includes(search.toLowerCase())
        );
    }
    filteredProducts = filteredProducts.slice().sort((a, b) => {
        const aValue = (a[sortBy] || "").toLowerCase();
        const bValue = (b[sortBy] || "").toLowerCase();
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    return (
        <div>
            <h1>Lista Prodotti</h1>
            <div className="filters">

                <input
                    type="text"
                    placeholder="Cerca per titolo..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <select value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat === "all" ? "Tutte le categorie" : cat}</option>
                    ))}
                </select>

                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="title">Ordina per titolo</option>
                    <option value="category">Ordina per categoria</option>
                </select>

                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

            </div>

            <ul className="devices-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts
                        .filter(product =>
                            typeof product.title === "string" && product.title.trim() !== "" &&
                            typeof product.category === "string" && product.category.trim() !== ""
                        )
                        .map(product => (
                            <li key={product.id}>
                                <button
                                    className={
                                        "toggle-compare-btn" +
                                        (compareList.includes(product.id) ? " remove" : "")
                                    }
                                    onClick={() => toggleCompare(product.id)}
                                >
                                    {compareList.includes(product.id)
                                        ? "Rimuovi dalla comparazione"
                                        : "Aggiungi a comparazione"}
                                </button>
                                <a href={`/${product.id}`}>
                                    <p>Prodotto: {product.title}</p>
                                    <p>Categoria: {product.category}</p>
                                </a>
                            </li>
                        ))
                ) : (
                    <li>Nessun prodotto disponibile</li>
                )}
            </ul>
        </div>
    );
}

export default DevicesList;