import { createContext, useContext, useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const [search, setSearch] = useState("");


    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem("compareList");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta della fetch' + response.status);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Errore durante il fetch dei prodotti:', error);
            }
        };

        fetchAllProducts();
    }, []);

    const toggleCompare = (product) => {
        setCompareList(prev =>
            prev.some(p => p.id === product.id)
                ? prev.filter(p => p.id !== product.id)
                : [...prev, product]
        );
    };


    return (
        <GlobalContext.Provider value={{
            products,
            search, setSearch,
            compareList,
            toggleCompare,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}