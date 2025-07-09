import { useState, useCallback } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


export default function Compare() {
    const { products, compareList, toggleCompare, compareDetails, debounce, toggleFavorite, favorites } = useGlobalContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const debouncedSetSearchTerm = useCallback(
        debounce((val) => { // Applica il debounce alla funzione che riceve un valore
            setSearchTerm(val); // Imposta il termine di ricerca con il valore ricevuto
            setShowDropdown(val.length > 0); // Mostra il dropdown solo se il valore ha lunghezza maggiore di 0
        }, 500),
        []
    );


    const availableProducts = products.filter( // Filtra i prodotti disponibili per l'aggiunta alla comparazione nella barra di ricerca
        p => // Per ogni prodotto p
            !compareList.includes(p.id) && // Controlla che il prodotto non sia già nella lista di confronto
            (p.title?.toLowerCase().includes(searchTerm.toLowerCase()) || // E che il titolo contenga il termine di ricerca (case insensitive)
                p.category?.toLowerCase().includes(searchTerm.toLowerCase())) // Oppure che la categoria contenga il termine di ricerca (case insensitive)
    );


    let infoMessage = null; // Inizializza la variabile per il messaggio informativo come null
    if (compareList.length === 0) {
        infoMessage = <div className="compare-empty">Nessun prodotto da comparare.</div>;
    } else if (compareList.length === 1) {
        infoMessage = <div className="compare-warning">Seleziona almeno 2 prodotti da confrontare.</div>;
    }


    return (
        <div className="compare-container">
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Prodotti Da Comparare</h1>

            <div className="compare-search-bar">
                <input
                    type="text"
                    placeholder="Cerca prodotto da aggiungere..."
                    onChange={e => {
                        debouncedSetSearchTerm(e.target.value);
                    }}
                    onFocus={() => setShowDropdown(searchTerm.length > 0)} // Al focus, mostra dropdown se c'è un termine di ricerca
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // Al blur, nasconde dropdown dopo 150ms
                    className="compare-search-input" // Classe CSS per lo styling dell'input
                />
                {showDropdown && availableProducts.length > 0 && ( // Renderizza dropdown solo se showDropdown è true e ci sono prodotti disponibili
                    <ul className="compare-dropdown"> {/* Lista dropdown con i prodotti trovati */}
                        {availableProducts.map(product => (
                            <li // Elemento della lista
                                key={product.id}
                                className="compare-dropdown-item"
                                onMouseDown={() => { // Gestore dell'evento mousedown (usato invece di click per evitare conflitti con onBlur)
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
                    const product = compareDetails[id]; // Ottiene i dettagli del prodotto dall'ID
                    if (!product) return <div key={id}>Prodotto non disponibile</div>;
                    return (
                        <div key={id} className="compare-card">
                            <h3>{product.title}</h3>
                            <p><strong>Categoria:</strong> {product.category}</p>
                            <p><strong>Descrizione:</strong> {product.description || "—"}</p>
                            <p><strong>Prezzo:</strong> {product.price ? `€${product.price}` : "—"}</p>
                            <p><strong>Colore:</strong> {product.color || "—"}</p>
                            <p><strong>Memoria:</strong> {product.storage || "—"}</p>
                            <div>
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
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 