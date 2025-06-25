import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";


export default function Compare() {
    const { products, compareList, toggleCompare, compareDetails } = useGlobalContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);



    const availableProducts = products.filter(
        p =>
            !compareList.includes(p.id) &&
            (p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category?.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    let infoMessage = null;
    if (compareList.length === 0) {
        infoMessage = <div className="compare-empty">Nessun prodotto da comparare.</div>;
    } else if (compareList.length === 1) {
        infoMessage = <div className="compare-warning">Seleziona almeno 2 prodotti da confrontare.</div>;
    }


    return (
        <div className="compare-container">
            <h1>Prodotti Da Comparare</h1>

            <div className="compare-search-bar">
                <input
                    type="text"
                    placeholder="Cerca prodotto da aggiungere..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowDropdown(searchTerm.length > 0)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    className="compare-search-input"
                />
                {showDropdown && availableProducts.length > 0 && (
                    <ul className="compare-dropdown">
                        {availableProducts.map(product => (
                            <li
                                key={product.id}
                                className="compare-dropdown-item"
                                onMouseDown={() => {
                                    toggleCompare(product.id);
                                    setSearchTerm("");
                                    setShowDropdown(false);
                                }}
                            >
                                {product.title} ({product.category})
                            </li>
                        ))}
                    </ul>
                )}
            </div>


            {infoMessage}


            <div className="compare-list">
                {compareList.map(id => {
                    const product = compareDetails[id];
                    if (!product) return <div key={id}>Caricamento...</div>;
                    return (
                        <div key={id} className="compare-card">
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
                            <h3>{product.title}</h3>
                            <p><strong>Categoria:</strong> {product.category}</p>
                            <p><strong>Descrizione:</strong> {product.description || "—"}</p>
                            <p><strong>Prezzo:</strong> {product.price ? `€${product.price}` : "—"}</p>
                            <p><strong>Colore:</strong> {product.color || "—"}</p>
                            <p><strong>Memoria:</strong> {product.storage || "—"}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}