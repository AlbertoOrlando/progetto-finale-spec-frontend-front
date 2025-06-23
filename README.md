🖼️ Cosa devi realizzare

Una SPA che simula l’esperienza di un utente non autenticato, che può:

Sfogliare, cercare e filtrare record
Confrontare più elementi tra loro
Salvare i preferiti
❌ Non può creare, modificare o cancellare record.



🔍 Tecnologie da utilizzare

Il progetto deve essere sviluppato esclusivamente con React in JavaScript, utilizzando solo le tecnologie viste durante il corso.

È consentito però l’uso di librerie esterne per la gestione dello styling, come ad esempio Tailwind CSS, Bootstrap o styled-components, purché non alterino il comportamento logico dell’applicazione.


🔧 Definisci le tue risorse

Nel file types.ts, definisci una o più risorse (es. Product, Game, Course...), purché:

✅ Siano esportate (export)
✅ Contengano sempre almeno queste 2 proprietà obbligatorie:
export type Product = {
  title: string;
  category: string;
};
💡 Ad eccezione di id, createdAt e updatedAt (che vengono aggiunte in automatico dal server), puoi aggiungere tutte le proprietà opzionali che vuoi, purché coerenti con la risorsa scelta (es. price, brand, releaseYear...).

Le proprietà readonly che inserisci possono venire salvate solo in creazione, ma non in update.

Il backend userà automaticamente il nome del tipo per generare:

File product.json nella cartella /database
Endpoint REST: /products, /products/:id, ecc.

🔧 API disponibili

Ecco le API REST disponibili per ogni tipo di risorsa:

POST /{tipo}s ➡️ Crea un nuovo record. Vengono ignorate le proprietà id, createdAt, updatedAt, se passate (vengono gestite autonomamente dal server). Restituisce il record completo.

GET /{tipo}s/:id ➡️ Restituisce un record per id. Restituisce errore se non trovato.

PUT /{tipo}s/:id ➡️ Aggiorna un record per id. Vengono ignorate le proprietà id, createdAt, updatedAt, se passate Restituisce errore se non trovato.

DELETE /{tipo}s/:id ➡️ Elimina il record per id. Restituisce errore se non trovato.

GET /{tipo}s ➡️ Restituisce la lista dei record Solo proprietà: id, createdAt, updatedAt, title, category Supporta query string:

?search=... → cerca in title
?category=... → filtra per category
Esempio: /products?search=iphone&category=tech


🔧 Dove vengono salvati i dati?

Ogni risorsa viene salvata come file .json in /database.

Esempio: se definisci Product, il backend creerà product.json.

Puoi inserire i dati:

Tramite API (fetch, Postman…)
Manualmente nei file .json (rispettando la forma del tipo)

📌 Popola ogni risorsa con almeno 10 record validi, per avere materiale sufficiente da confrontare.


⚠️ Attenzione!

❌ Non modificare:

I file .ts, .js o .json che definiscono la logica del server

Le rotte API (sono generate automaticamente in base a types.ts)

Le modalità di risposta o comportamento degli endpoint


✅ Puoi modificare SOLO:

Il file types.ts, per definire la tua risorsa

I file .json all'interno della cartella /database, per popolare i dati (manualmente o tramite API)




🥉 Requisiti Minimi

Per considerare il progetto completo, devono essere implementate almeno queste funzionalità:

Gestione di una risorsa definita in types.ts

Lista dei record, che mostra solo le proprietà principali title e category, e include:

Barra di ricerca per cercare nei titoli (title)
Filtro per categoria (category)
Ordinamento alfabetico per title o category (A-Z e Z-A)
Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.)

Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche.

È libera la modalità di selezione: puoi permettere all’utente di aggiungere record al comparatore direttamente dalla lista, dalla pagina di dettaglio, oppure usare un menu a tendina, checkbox o qualsiasi altro sistema.

L’importante è che l’utente possa scegliere 2 record qualsiasi e confrontarli in modo chiaro.

Sistema di preferiti, sempre accessibile e aggiornabile:

L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento
I preferiti devono essere consultabili in ogni sezione dell’app (es. tramite una sezione dedicata, un’icona fissa, o una sidebar)

🥈 Requisiti Consigliati (Facoltativi)

Da affrontare solo dopo aver completato i Requisiti Minimi:

Comparatore di 2 o più record: il layout si adatta per confrontare più elementi affiancati
Debounce sulla ricerca, per migliorare la UX ed evitare chiamate API inutili
Persistenza dei preferiti (es. salvataggio in localStorage), così che rimangano anche dopo il refresh della pagina
Gestione degli stati vuoti, come:
Nessun risultato trovato
Lista preferiti vuota
Nessun elemento selezionato nel comparatore

🥇 Requisiti Aggiuntivi (Facoltativi)

Da affrontare solo dopo i Requisiti Consigliati:

Gestione di più risorse nella stessa SPA (es. products e courses), con interfacce distinte o integrate
CRUD completo dal frontend:
Creazione di nuovi record
Modifica di record esistenti
Eliminazione di record
Validazione dei campi in input
