import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialForm = {
	name: "",
	phone: "",
	email: "",
	address: ""
};

const AddContact = () => {
	const { store } = useGlobalReducer();
	const navigate = useNavigate();
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
			navigate("/");
		} catch (error) {
			console.error("Error al crear contacto:", error);
		}
	};

	return (
		<div className="container py-4">
			<h1 className="text-center mb-4">Añadir contacto</h1>

			<form className="container" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="contactName" className="form-label">Nombre</label>
					<input
						id="contactName"
						type="text"
						className="form-control"
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
						name="email"
						value={formValues.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactPhone" className="form-label">Teléfono</label>
					<input
						id="contactPhone"
						type="text"
						className="form-control"
						name="phone"
						value={formValues.phone}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactAddress" className="form-label">Dirección</label>
					<input
						id="contactAddress"
						type="text"
						className="form-control"
						name="address"
						value={formValues.address}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<button type="submit" className="btn btn-primary">Guardar</button>
				</div>
			</form>

			<Link to="/">Volver</Link>
		</div>
	);
};

export default AddContact;
