import { useGlobalContext } from "../context/GlobalContext";


export default function Favorites() {
    const { toggleCompare, favorites, toggleFavorite, products } = useGlobalContext();

    return (
        <div>
            <h1>Preferiti</h1>
            {favorites.length === 0 ? (
                <div>Nessun prodotto tra i preferiti.</div>
            ) : (
                <ul>
                    {favorites.map(id => {
                        const product = products.find(p => p.id === id);
                        if (!product) return null;
                        return (
                            <li key={id}>
                                <h2>{product.title}</h2>
                                <p>Categoria: {product.category}</p>
                                <button onClick={() => toggleCompare(id)}>Confronta</button>
                                <button onClick={() => toggleFavorite(id)}>Rimuovi dai preferiti</button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}