import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Favorites() {

    return (
        <div>
            <h1>Preferenze</h1>
            <p>Questa pagina è ancora in fase di sviluppo.</p>
            <p>Per ora, puoi solo modificare le preferenze di visualizzazione dei prodotti.</p>
            <p>Le preferenze attuali sono:</p>
            <ul>
                <li>Visualizza prodotti in ordine alfabetico</li>
                <li>Mostra solo prodotti disponibili</li>
            </ul>
        </div>
    );
}