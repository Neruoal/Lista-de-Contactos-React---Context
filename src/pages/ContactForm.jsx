import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  address: ""
};

// Función API para crear contacto
async function createContactAPI(contact) {
  const BASE_URL = "https://playground.4geeks.com/contact/agendas/manuel1991";
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
  return data;
}

// Función API para editar contacto
async function editContactAPI(id, contact) {
  const BASE_URL = "https://playground.4geeks.com/contact/agendas/manuel1991";
  const resp = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
  if (!resp.ok) {
    console.log("error al editar");
    return;
  }
  const data = await resp.json();
  console.log("contacto editado:", data);
  return data;
}

export const ContactForm = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const { contactId } = useParams();
  const editingContact = store.contacts.find((contact) => contact.id === contactId);
  const isEditing = Boolean(editingContact);

  const [formValues, setFormValues] = useState(emptyForm);

  useEffect(() => {
    if (editingContact) {
      setFormValues({
        fullName: editingContact.fullName,
        email: editingContact.email,
        phone: editingContact.phone,
        address: editingContact.address
      });
    } else {
      setFormValues(emptyForm);
    }
  }, [editingContact]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const infoValues = {
      name: formValues.fullName.trim(),
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
      address: formValues.address.trim()
    };

    const hasEmptyField = Object.values(infoValues).some((value) => value.length === 0);

    if (hasEmptyField) {
      return;
    }

    if (isEditing) {
      editContactAPI(editingContact.id, infoValues).then(() => {
        navigate("/");
      });
    } else {
      createContactAPI(infoValues).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <section className="container add-contact-page">
      <h1 className="add-contact-title">{isEditing ? "Editar contacto" : "Agregar nuevo contacto"}</h1>

      <form onSubmit={handleSubmit} className="add-contact-form">
        <label className="add-contact-label">
          Nombre
          <input
            className="add-contact-input"
            autoComplete="name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
          />
        </label>

        <label className="add-contact-label">
          Email
          <input
            className="add-contact-input"
            autoComplete="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </label>

        <label className="add-contact-label">
          Teléfono
          <input
            className="add-contact-input"
            autoComplete="tel"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
          />
        </label>

        <label className="add-contact-label">
          Dirección
          <input
            className="add-contact-input"
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
        </label>

        <button className="add-contact-save-btn" type="submit">
          Guardar
        </button>
        <Link className="add-contact-back-link" to="/">
          Volver a contactos
        </Link>
      </form>
    </section>
  );
};