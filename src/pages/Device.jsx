import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
const { VITE_API_URL } = import.meta.env;


export default function Device() {
    const { id } = useParams();
    const { compareList, toggleCompare } = useGlobalContext();
    const [detailedProduct, setDetailedProduct] = useState(null);

    const fetchProductById = async (id) => {
        try {
            const res = await fetch(`${VITE_API_URL}/${id}`);
            if (!res.ok) throw new Error("Errore nella fetch del dettaglio" + res.status);
            const data = await res.json();
            setDetailedProduct(data);

        } catch (error) {
            console.error('Errore durante il fetch del prodotto:', error);
        }
    };


    useEffect(() => {
        fetchProductById(id);
    }, [id]);

    const product = detailedProduct?.product;

    if (!product) {
        return <div>Caricamento...</div>;
    }

    return (
        <div>
            <h1 className="device-title">Dettaglio Prodotto</h1>
            <div className="device-detail">
                <h2>{product.title}</h2>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Descrizione:</strong> {product.description || "Non disponibile"}</p>
                <p><strong>Prezzo:</strong> {product.price ? `€${product.price}` : "Non disponibile"}</p>
                <p><strong>Colore:</strong> {product.color || "Non disponibile"}</p>
                <p><strong>Memoria:</strong> {product.storage || "Non disponibile"}</p>
                <button
                    className={
                        "toggle-compare-btn"
                    }
                    onClick={() => toggleCompare(product.id)}
                >
                    <FontAwesomeIcon
                        icon={faBalanceScale}
                        style={{
                            color: compareList.includes(product.id) ? "green" : "#888",
                            fontSize: "1.2rem"
                        }}
                    />
                </button>
            </div>
        </div>
    );
}