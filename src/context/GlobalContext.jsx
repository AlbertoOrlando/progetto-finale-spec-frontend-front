import { createContext, useContext, useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;
export const GlobalContext = createContext(); // Crea il contesto globale per condividere dati tra componenti

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem("compareList"); // Recupera la lista salvata dal localStorage
        return saved ? JSON.parse(saved) : []; // Se esiste la converte da JSON, altrimenti array vuoto
    });
    const [compareDetails, setCompareDetails] = useState({}); // Stato per memorizzare i dettagli dei prodotti da confrontare
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites"); // Recupera i preferiti salvati dal localStorage
        return saved ? JSON.parse(saved) : []; // Se esistono li converte da JSON, altrimenti array vuoto
    });

    useEffect(() => {
        localStorage.setItem("compareList", JSON.stringify(compareList)); // Salva la lista di confronto nel localStorage come stringa JSON
    }, [compareList]); // Dipendenza: si esegue quando compareList cambia

    useEffect(() => { // Hook che si attiva quando favorites cambia
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Salva i preferiti nel localStorage come stringa JSON
    }, [favorites]); // Dipendenza: si esegue quando favorites cambia

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${VITE_API_URL}`);
                if (!response.ok) {
                    throw new Error('Errore nella risposta della fetch' + response.status); // Lancia un errore se la risposta non è ok
                }
                const data = await response.json(); // Converte la risposta in formato JSON
                setProducts(data); // Aggiorna lo stato con i prodotti ricevuti
            } catch (error) {
                console.error('Errore durante il fetch dei prodotti:', error);
            }
        };

        fetchAllProducts();
    }, []);

    useEffect(() => {
        const fetchDetails = async () => { // Funzione asincrona per recuperare i dettagli dei prodotti da confrontare
            const details = {}; // Oggetto per memorizzare i dettagli di ogni prodotto
            for (const id of compareList) { // Itera su ogni ID nella lista di confronto
                try {
                    const res = await fetch(`${VITE_API_URL}/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        details[id] = data.product || data; // Salva i dettagli del prodotto nell'oggetto
                    }
                } catch (e) {
                    details[id] = null; // Se c'è un errore, imposta null per questo ID
                }
            }
            setCompareDetails(details); // Aggiorna lo stato con tutti i dettagli raccolti
        };
        if (compareList.length > 0) fetchDetails(); // Esegue il fetch solo se ci sono elementi nella lista
    }, [compareList]);

    const toggleCompare = (id) => {
        setCompareList(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    function debounce(fn, delay) { // Funzione di utilità per limitare la frequenza di chiamate di una funzione
        let timer = null; // Variabile per memorizzare il timer
        return (...args) => { // Restituisce una funzione che accetta qualsiasi numero di argomenti
            if (timer) clearTimeout(timer); // Se esiste già un timer, lo cancella
            timer = setTimeout(() => { // Imposta un nuovo timer che eseguirà la funzione dopo il delay
                fn(...args); // Esegue la funzione originale con tutti gli argomenti passati
            }, delay); // Delay specificato in millisecondi
        };
    }

    return (
        <GlobalContext.Provider value={{ // Provider del contesto che fornisce tutti i valori ai componenti figli
            products,
            compareList,
            toggleCompare,
            compareDetails,
            favorites,
            toggleFavorite,
            debounce
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function useGlobalContext() { // Hook personalizzato per accedere al contesto globale
    const context = useContext(GlobalContext); // Recupera il valore del contesto
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
}
