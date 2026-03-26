import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const BASE_URL = "https://playground.4geeks.com/contact/agendas/manuel1991";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	async function getContacts() {
		console.log("cargando contactos...");
		let resp = await fetch(`${BASE_URL}/contacts`);
		if (resp.status === 404) {
			// La agenda no existe, la creamos primero
			await fetch("https://playground.4geeks.com/contact/agendas/manuel1991", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ slug: "manuel1991" })
			});
			resp = await fetch(`${BASE_URL}/contacts`);
		}
		if (!resp.ok) return;
		const data = await resp.json();
		console.log("contactos recibidos:", data);
		
		// Mapear los contactos de la API para que tengan fullName e id como string
		const mappedContacts = (data.contacts ?? data).map(contact => ({
			...contact,
			id: String(contact.id),
			fullName: contact.name
		}));
		
		dispatch({
			type: "set_contacts",
			payload: mappedContacts
		});
	}

	async function createContact(contact) {
		const resp = await fetch(`${BASE_URL}/contacts`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(contact)
		});
		if (!resp.ok) {
			console.log("error al crear");
			return;
		}
		const data = await resp.json();
		console.log("contacto creado:", data);
		getContacts();
	}

	async function deleteContact(id) {
		const resp = await fetch(`https://playground.4geeks.com/contact/agendas/manuel1991/contacts/${id}`, {
			method: "DELETE"
		});
		if (!resp.ok) {
			console.log("no se pudo borrar");
			return;
		}
		console.log("contacto borrado");
		getContacts();
	}

	async function editContact(id, payload) {
		const resp = await fetch(`${BASE_URL}/contacts/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		if (!resp.ok) {
			console.log("error al editar");
			return;
		}
		const data = await resp.json();
		console.log("contacto editado:", data);
		getContacts();
	}

	useEffect(() => {
		getContacts();
	}, []);

	const handleDelete = (contactId) => {
		deleteContact(contactId);
	};

	return (
		<main className="contacts-page container py-4">
			<div className="contacts-toolbar">
				<Link className="add-contact-btn" to="/contacts/new">
					Agregar nuevo contacto
				</Link>
			</div>

			<section className="contacts-box">
				{store.contacts.length > 0 ? (
					<div>
						{store.contacts.map((contact) => (
							<article className="contact-row" key={contact.id}>
								<div className="avatar-wrap">
									<div className="avatar-photo" aria-hidden="true">
										<i className="fa-solid fa-user"></i>
									</div>
								</div>

								<div className="contact-main">
									<h2 className="contact-name">{contact.fullName}</h2>
									<div className="contact-line">
										<i className="fa-solid fa-location-dot"></i>
										<span>{contact.address}</span>
									</div>
									<div className="contact-line">
										<i className="fa-solid fa-phone"></i>
										<span>{contact.phone}</span>
									</div>
									<div className="contact-line">
										<i className="fa-solid fa-envelope"></i>
										<span>{contact.email}</span>
									</div>
								</div>

								<div className="row-actions">
									<Link
										className="action-icon-btn"
										to={`/contacts/${contact.id}/edit`}
										title="Editar"
									>
										<i className="fa-solid fa-pen-to-square"></i>
									</Link>
									<button
										className="action-icon-btn"
										type="button"
										title="Eliminar"
										onClick={() => handleDelete(contact.id)}
									>
										<i className="fa-solid fa-delete-left"></i>
									</button>
								</div>
							</article>
						))}
					</div>
				) : null}
			</section>
		</main>
	);
};
