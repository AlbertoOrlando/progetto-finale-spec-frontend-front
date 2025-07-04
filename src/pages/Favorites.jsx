import { useGlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";



export default function Favorites() {
    const { toggleCompare, favorites, toggleFavorite, products, compareList } = useGlobalContext();

    return (
        <div className="favorites-container">
            <h1>Preferiti</h1>
            {favorites.length === 0 ? (
                <div>Nessun prodotto tra i preferiti.</div>
            ) : (
                <ul className="favorites-list">
                    {favorites.map(id => {
                        const product = products.find(p => p.id === id);
                        if (!product) return null;
                        return (
                            <li key={id} className="devices-list-card">
                                <h2>{product.title}</h2>
                                <p>Categoria: {product.category}</p>
                                <button onClick={() => toggleCompare(id)} className={
                                    "toggle-compare-btn"
                                }>
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
                                    onClick={() => toggleFavorite(id)}

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
                        );
                    })}
                </ul>
            )}
        </div>
    );
}