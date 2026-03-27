import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import CardContact from "../components/CardContact";

const Contacts = () => {
	const { store, dispatch } = useGlobalReducer();
	const contacts = store.contacts ?? [];

	async function getContacts() {
		try {
			const resp = await fetch("https://playground.4geeks.com/contact/agendas/manuel1991/contacts");
			const data = await resp.json();
			const nextContacts = (data.contacts || data).map((contact) => ({
				...contact,
				id: String(contact.id)
			}));

			dispatch({
				type: "set_contacts",
				payload: nextContacts
			});
		} catch (error) {
			console.error("Error al cargar contactos:", error);
		}
	}

	useEffect(() => {
		getContacts();
	}, []);

	return (
		<div className="w-75 mx-auto">
			<div className="d-flex justify-content-end">
				<Link to="/addContact" className="btn btn-success">
					Añadir contacto
				</Link>
			</div>

			<ul className="list-group mt-3">
				{contacts.map((contact) => (
					<CardContact contact={contact} key={contact.id} onDeleted={getContacts} />
				))}
			</ul>
		</div>
	);
};

export default Contacts;
