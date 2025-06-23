import { createContext, useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [detailedProduct, setDetailedProduct] = useState(null);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta della fetch');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Errore durante il fetch dei prodotti:', error);
            }
        };

        fetchAllProducts();
    }, []);

    const fetchProductById = async (id) => {
        setDetailedProduct(null);
        try {
            const res = await fetch(`${VITE_API_URL}/${id}`);
            if (!res.ok) throw new Error("Errore nella fetch del dettaglio");
            const data = await res.json();
            setDetailedProduct(data);

            setProducts(prev =>
                prev.map(p => p.id == id ? { ...p, ...data } : p))
                ;
        } catch (error) {
            console.error(error);
            setDetailedProduct(null);
        }
    };

    return (
        <GlobalContext.Provider value={{
            products,
            detailedProduct,
            fetchProductById,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};