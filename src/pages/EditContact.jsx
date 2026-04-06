import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
    const { contacts, updateContact } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const currentContact = contacts.find(
            (contact) => String(contact.id) === String(id)
        );

        if (!currentContact) return;

        setName(currentContact.name ?? "");
        setEmail(currentContact.email ?? "");
        setPhone(currentContact.phone ?? "");
        setAddress(currentContact.address ?? "");
    }, [id, contacts]);

    const handleSubmit = (event) => {
        event.preventDefault();

        updateContact(id, { name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() })
            .then(() => navigate("/"));
    };

    return (
        <div className="container py-4">
            <h1 className="text-center mb-4">Editar contacto</h1>

            <form className="container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="editName" className="form-label">Nombre</label>
                    <input
                        id="editName"
                        type="text"
                        className="form-control"
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
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="editPhone" className="form-label">Teléfono</label>
                    <input
                        id="editPhone"
                        type="text"
                        className="form-control"
                        onChange={(event) => setPhone(event.target.value)}
                        value={phone}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="editAddress" className="form-label">Dirección</label>
                    <input
                        id="editAddress"
                        type="text"
                        className="form-control"
                        onChange={(event) => setAddress(event.target.value)}
                        value={address}
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" aria-label="Editar contacto" title="Editar contacto">
                        Guardar
                    </button>
                </div>
            </form>

            <Link to="/">Volver a Contacts</Link>
        </div>
    );
};

export default EditContact;
