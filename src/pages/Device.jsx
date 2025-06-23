import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Device() {
    const { id } = useParams();
    const { detailedProduct, fetchProductById } = useContext(GlobalContext);

    useEffect(() => {
        fetchProductById(id);
    }, [id]);

    console.log("detailedProduct", detailedProduct);


    if (!detailedProduct) {
        return <div>Caricamento...</div>;
    }

    const {
        title,
        category,
        description,
        price,
        color,
        storage
    } = detailedProduct.product;

    return (
        <div>
            <h2>{title}</h2>
            <p><strong>Categoria:</strong> {category}</p>
            <p><strong>Descrizione:</strong> {description || "Non disponibile"}</p>
            <p><strong>Prezzo:</strong> {price ? `€${price}` : "Non disponibile"}</p>
            <p><strong>Colore:</strong> {color || "Non disponibile"}</p>
            <p><strong>Memoria:</strong> {storage || "Non disponibile"}</p>
            <Link to="/">← Torna alla lista</Link>
        </div>
    );
}