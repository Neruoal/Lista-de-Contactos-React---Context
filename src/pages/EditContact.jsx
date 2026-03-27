import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
	const { store } = useGlobalReducer();
	const navigate = useNavigate();
	const { id } = useParams();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		const currentContact = store.contacts.find(
			(contact) => String(contact.id) === String(id)
		);

		if (!currentContact) return;

		setName(currentContact.name ?? "");
		setEmail(currentContact.email ?? "");
		setPhone(currentContact.phone ?? "");
		setAddress(currentContact.address ?? "");
	}, [id, store.contacts]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const updates = {
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			address: address.trim()
		};

		try {
			await fetch(`https://playground.4geeks.com/contact/agendas/manuel1991/contacts/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates)
			});
		} catch (error) {
			console.error("Error al editar contacto:", error);
		}

		alert("Contacto actualizado");
		navigate("/");
	};

	return (
		<div className="container py-4">
			<h1 className="text-center mb-4">Update Contact</h1>

			<form className="container" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="editName" className="form-label">Full Name</label>
					<input
						id="editName"
						type="text"
						className="form-control"
						placeholder="Full name"
						onChange={(event) => setName(event.target.value)}
						value={name}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="editEmail" className="form-label">Email</label>
					<input
						id="editEmail"
						type="email"
						className="form-control"
						placeholder="Enter email"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="editPhone" className="form-label">Phone</label>
					<input
						id="editPhone"
						type="text"
						className="form-control"
						placeholder="Enter phone"
						onChange={(event) => setPhone(event.target.value)}
						value={phone}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="editAddress" className="form-label">Address</label>
					<input
						id="editAddress"
						type="text"
						className="form-control"
						placeholder="Enter address"
						onChange={(event) => setAddress(event.target.value)}
						value={address}
					/>
				</div>

				<div className="mb-3">
					<button type="submit" className="btn btn-primary">Update Contact</button>
				</div>
			</form>

			<Link to="/">Volver a Contacts</Link>
		</div>
	);
};

export default EditContact;
