import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function DevicesList() {
    const { products } = useContext(GlobalContext);

    // Stati per ricerca, filtro e ordinamento
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Ricava tutte le categorie disponibili
    const categories = useMemo(() => {
        const cats = products.map(p => p.category);
        return ["all", ...Array.from(new Set(cats))];
    }, [products]);

    // Filtra, cerca e ordina i prodotti
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filtro per categoria
        if (category !== "all") {
            filtered = filtered.filter(p => p.category === category);
        }

        // Ricerca per titolo
        if (search.trim() !== "") {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Ordinamento
        filtered = filtered.slice().sort((a, b) => {
            const aValue = a[sortBy].toLowerCase();
            const bValue = b[sortBy].toLowerCase();
            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [products, search, category, sortBy, sortOrder]);

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
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === "all" ? "Tutte le categorie" : cat}</option>
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
                    filteredProducts.map((product) => (
                        <li key={product.id}>
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