import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Compare() {
    const { products, compareList, toggleCompare } = useContext(GlobalContext);
    const [selectedId, setSelectedId] = useState("");

    const availableProducts = products.filter(
        p => !compareList.some(c => c.id === p.id)
    );

    return (
        <div className="compare-container">
            <div className="compare-add-bar">
                <select
                    value={selectedId}
                    onChange={e => setSelectedId(e.target.value)}
                >
                    <option value="">Aggiungi un prodotto...</option>
                    {availableProducts.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.title} ({product.category})
                        </option>
                    ))}
                </select>
                <button
                    className="compare-add-btn"
                    disabled={!selectedId}
                    onClick={() => {
                        const product = availableProducts.find(p => p.id == selectedId);
                        if (product) toggleCompare(product);
                        setSelectedId("");
                    }}
                >
                    Aggiungi
                </button>
            </div>
            {compareList.length === 0 ? (
                <div className="compare-empty">Nessun prodotto selezionato per la comparazione.</div>
            ) : (
                <div className="compare-list">
                    {compareList.map(product => (
                        <div key={product.id} className="compare-card">
                            <button
                                className="compare-remove-btn"
                                onClick={() => toggleCompare(product)}
                            >
                                Rimuovi dalla comparazione
                            </button>
                            <h3>{product.title}</h3>
                            <p><strong>Categoria:</strong> {product.category}</p>
                            <p><strong>Descrizione:</strong> {product.description || "—"}</p>
                            <p><strong>Prezzo:</strong> {product.price ? `€${product.price}` : "—"}</p>
                            <p><strong>Colore:</strong> {product.color || "—"}</p>
                            <p><strong>Memoria:</strong> {product.storage || "—"}</p>
                        </div>
                    ))}
                </div>
            )}
            {compareList.length < 2 && compareList.length > 0 && (
                <div className="compare-warning">
                    Seleziona almeno un altro prodotto per confrontarli.
                </div>
            )}
        </div>
    );
}