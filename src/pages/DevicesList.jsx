import { useState, useCallback, useMemo } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function DevicesList() {
    const {
        products,
        compareList, toggleCompare,
        toggleFavorite,
        favorites,
        debounce
    } = useGlobalContext();

    const [search, setSearch] = useState("");

    const debouncedSetSearch = useCallback(debounce(setSearch, 500), []);

    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Memorizza le categorie per evitare ricalcoli inutili
    const categories = useMemo(() => {
        return ["all", ...Array.from(new Set(
            products
                .map(p => p.category)
                .filter(cat => typeof cat === "string" && cat.trim() !== "")
        ))];
    }, [products]);

    // Memorizza i prodotti filtrati e ordinati
    const filteredAndSortedProducts = useMemo(() => {
        let currentProducts = products;

        // Filtra per categoria
        if (category !== "all") {
            currentProducts = currentProducts.filter(p => p.category === category);
        }

        // Filtra per ricerca
        if ((search || "").trim() !== "") {
            currentProducts = currentProducts.filter(p =>
                (p.title || "").toLowerCase().includes(search.toLowerCase())
            );
        }

        // Ordina i prodotti
        return currentProducts.slice().sort((a, b) => {
            const aValue = (a[sortBy] || "").toLowerCase();
            const bValue = (b[sortBy] || "").toLowerCase();
            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [products, category, search, sortBy, sortOrder]); // Dipendenze: quando una di queste cambia, ricalcola


    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Lista Prodotti</h1>
            <div className="filters">

                <input
                    type="text"
                    placeholder="Cerca per titolo..."
                    onChange={e => {
                        debouncedSetSearch(e.target.value);
                    }}
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
                {/* Usa filteredAndSortedProducts */}
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts
                        .filter(product =>
                            // Questo filtro finale è più un controllo di robustezza.
                            // Potrebbe non essere strettamente necessario se i dati 'products' sono sempre puliti.
                            typeof product.title === "string" && product.title.trim() !== "" &&
                            typeof product.category === "string" && product.category.trim() !== ""
                        )
                        .map(product => (
                            <li key={product.id}>
                                <a href={`/device/${product.id}`}>
                                    <p><strong>Prodotto:</strong> {product.title}</p>
                                    <p><strong>Categoria:</strong> {product.category}</p>
                                </a>
                                <button
                                    className={
                                        "toggle-compare-btn"
                                    }
                                    onClick={() => toggleCompare(product.id)}
                                >
                                    <FontAwesomeIcon
                                        icon={faBalanceScale}
                                        style={{
                                            color: compareList.includes(product.id) ? "green" : "grey",
                                            fontSize: "1.2rem"
                                        }}
                                    />
                                </button>
                                <button
                                    className={
                                        "toggle-favorite-btn"
                                    }
                                    onClick={() => toggleFavorite(product.id)}
                                >
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        style={{
                                            color: favorites.includes(product.id) ? "red" : "grey",
                                            fontSize: "1.2rem"
                                        }}
                                    />
                                </button>
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