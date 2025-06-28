import { useState, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";


export default function Compare() {
    const { products, compareList, toggleCompare, compareDetails, debounce } = useGlobalContext();

    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const debouncedSetSearchTerm = useRef(
        debounce((val) => {
            setSearchTerm(val);
            setShowDropdown(val.length > 0);
        }, 500)
    ).current;


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
                    value={inputValue}
                    onChange={e => {
                        setInputValue(e.target.value);
                        debouncedSetSearchTerm(e.target.value);
                    }}
                    onFocus={() => setShowDropdown(inputValue.length > 0)}
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
                                    setInputValue("");
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
                            <h3>{product.title}</h3>
                            <p><strong>Categoria:</strong> {product.category}</p>
                            <p><strong>Descrizione:</strong> {product.description || "—"}</p>
                            <p><strong>Prezzo:</strong> {product.price ? `€${product.price}` : "—"}</p>
                            <p><strong>Colore:</strong> {product.color || "—"}</p>
                            <p><strong>Memoria:</strong> {product.storage || "—"}</p>
                            <button
                                className={
                                    "toggle-compare-btn" +
                                    (compareList.includes(product.id) ? " remove" : "")
                                }
                                onClick={() => toggleCompare(product.id)}
                                title={compareList.includes(product.id) ? "Rimuovi dalla comparazione" : "Aggiungi a comparazione"}
                            >
                                <FontAwesomeIcon
                                    icon={faBalanceScale}
                                    style={{
                                        color: compareList.includes(product.id) ? "green" : "grey",
                                        fontSize: "1.2rem"
                                    }}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}