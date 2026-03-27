import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialForm = {
	name: "",
	phone: "",
	email: "",
	address: ""
};

const AddContact = () => {
	const { store } = useGlobalReducer();
	const { id } = useParams();
	const isEditing = Boolean(id);

	const [formValues, setFormValues] = useState(initialForm);

	useEffect(() => {
		if (!isEditing) return;

		const contactToEdit = store.contacts.find((contact) => String(contact.id) === String(id));
		if (!contactToEdit) return;

		setFormValues({
			name: contactToEdit.name ?? "",
			phone: contactToEdit.phone ?? "",
			email: contactToEdit.email ?? "",
			address: contactToEdit.address ?? ""
		});
	}, [id, isEditing, store.contacts]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormValues({
			...formValues,
			[name]: value
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const payload = {
			name: formValues.name.trim(),
			phone: formValues.phone.trim(),
			email: formValues.email.trim(),
			address: formValues.address.trim()
		};

		try {
			await fetch("https://playground.4geeks.com/contact/agendas/manuel1991/contacts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
		} catch (error) {
			console.error("Error al crear contacto:", error);
		}
	};

	return (
		<div className="container py-4">
			<h1 className="text-center mb-4">{isEditing ? "Editar contacto" : "Add a New Contact"}</h1>

			<form className="container" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="contactName" className="form-label">Full Name</label>
					<input
						id="contactName"
						type="text"
						className="form-control"
						placeholder="Full name"
						name="name"
						value={formValues.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactEmail" className="form-label">Email</label>
					<input
						id="contactEmail"
						type="email"
						className="form-control"
						placeholder="Enter email"
						name="email"
						value={formValues.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactPhone" className="form-label">Phone</label>
					<input
						id="contactPhone"
						type="text"
						className="form-control"
						placeholder="Enter phone"
						name="phone"
						value={formValues.phone}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactAddress" className="form-label">Address</label>
					<input
						id="contactAddress"
						type="text"
						className="form-control"
						placeholder="Enter address"
						name="address"
						value={formValues.address}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<button type="submit" className="btn btn-primary">Save</button>
				</div>
			</form>

			<Link to="/">Volver a Contacts</Link>
		</div>
	);
};

export default AddContact;
