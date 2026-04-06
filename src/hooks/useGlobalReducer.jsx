// Import necessary hooks and functions from React.
import { useContext, useState, createContext } from "react";

const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "manuel1991";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [contacts, setContacts] = useState([]);

    const store = {
        contacts,
        getContacts: () =>
            fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`)
                .then(resp => resp.json())
                .then(data => setContacts(Array.isArray(data.contacts) ? data.contacts : []))
                .catch(err => console.error("Error al obtener contactos:", err)),

        createContact: (data) =>
            fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(resp => resp.json())
                .then(newContact => setContacts(prev => [newContact, ...prev]))
                .catch(err => console.error("Error al crear contacto:", err)),

        updateContact: (id, data) =>
            fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(resp => resp.json())
                .then(updated => setContacts(prev =>
                    prev.map(c => c.id === id ? { ...c, ...updated } : c)
                ))
                .catch(err => console.error("Error al actualizar contacto:", err)),

        deleteContact: (id) =>
            fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, { method: "DELETE" })
                .then(resp => {
                    if (resp.status === 404)
                        return fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`, { method: "POST" })
                            .then(() => store.deleteContact(id));
                    if (resp.ok)
                        setContacts(prev => prev.filter(c => c.id !== id));
                })
                .catch(err => console.error("Error al borrar contacto:", err))
    };

    return <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>;
}

export default function useGlobalReducer() {
    return useContext(StoreContext);
}