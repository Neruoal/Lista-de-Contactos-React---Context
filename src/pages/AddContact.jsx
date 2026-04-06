import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const AddContact = () => {
	const navigate = useNavigate();
	const { createContact } = useGlobalReducer();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		createContact({ name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() })
			.then(() => navigate("/"))
			.catch(err => console.error("Error al crear contacto:", err));
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
						value={name}
						onChange={(event) => setName(event.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactEmail" className="form-label">Email</label>
					<input
						id="contactEmail"
						type="email"
						className="form-control"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactPhone" className="form-label">Teléfono</label>
					<input
						id="contactPhone"
						type="text"
						className="form-control"
						value={phone}
						onChange={(event) => setPhone(event.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="contactAddress" className="form-label">Dirección</label>
					<input
						id="contactAddress"
						type="text"
						className="form-control"
						value={address}
						onChange={(event) => setAddress(event.target.value)}
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
