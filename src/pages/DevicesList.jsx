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

    const debouncedSetSearch = useCallback(debounce(setSearch, 500), []); // Creazione di una versione debouncata della funzione setSearch con delay di 500ms

    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");

    // Memorizza le categorie per evitare ricalcoli inutili
    const categories = useMemo(() => { // Creazione di un memo per le categorie disponibili
        return ["all", ...Array.from(new Set( // Ritorna un array che inizia con "all" e contiene tutte le categorie uniche
            products
                .map(p => p.category)
                .filter(cat => typeof cat === "string" && cat.trim() !== "") // Filtra solo le categorie che sono stringhe non vuote
        ))];
    }, [products]);


    const filteredAndSortedProducts = useMemo(() => {
        let currentProducts = products;

        if (category !== "all") { // Se la categoria selezionata non è "all"
            currentProducts = currentProducts.filter(p => p.category === category); // Filtra i prodotti per categoria
        }

        if ((search || "").trim() !== "") { // Se c'è una stringa di ricerca non vuota
            currentProducts = currentProducts.filter(p => // Filtra i prodotti che contengono la stringa di ricerca nel titolo
                (p.title || "").toLowerCase().includes(search.toLowerCase()) // Confronto case-insensitive tra titolo del prodotto e ricerca
            );
        }


        return currentProducts.slice().sort((a, b) => { // Ritorna una copia ordinata dell'array
            const aValue = (a[sortBy] || "").toLowerCase(); // Ottiene il valore del campo di ordinamento per il primo elemento, convertito in minuscolo
            const bValue = (b[sortBy] || "").toLowerCase(); // Ottiene il valore del campo di ordinamento per il secondo elemento, convertito in minuscolo
            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0; // Se i valori sono uguali, mantiene l'ordine originale
        });
    }, [products, category, search, sortBy, sortOrder]);


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
                    {categories.map((cat, index) => ( // Mappatura delle categorie per creare le opzioni
                        <option key={index} value={cat}>{cat === "all" ? "Tutte le categorie" : cat}</option> // Opzione con testo condizionale
                    ))}
                </select>

                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="title">Ordina per titolo</option> {/* Opzione per ordinare per titolo */}
                    <option value="category">Ordina per categoria</option> {/* Opzione per ordinare per categoria */}
                </select>

                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="asc">A-Z</option> {/* Opzione per ordine crescente */}
                    <option value="desc">Z-A</option> {/* Opzione per ordine decrescente */}
                </select>

            </div>

            <ul className="devices-list">

                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts
                        .filter(product =>
                            typeof product.title === "string" && product.title.trim() !== "" && // Verifica che il titolo sia una stringa non vuota
                            typeof product.category === "string" && product.category.trim() !== "" // Verifica che la categoria sia una stringa non vuota
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