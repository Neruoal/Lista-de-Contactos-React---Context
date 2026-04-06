import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardContact = ({ contact }) => {
    const { deleteContact } = useGlobalReducer();

    const handleDelete = () => {
        if (!window.confirm("Estas seguro de borrar este contacto?")) return;
        deleteContact(contact.id);
    };

    return (
        <li className="list-group-item d-flex justify-content-center">
            <div className="d-flex align-items-center w-75">
                <div className="col-md-3 d-flex justify-content-center">
                    <i className="fa-solid fa-user fa-4x" aria-label="Contacto"></i>
                </div>

                <div className="col-md-6">
                    <h5 className="card-title mb-1">{contact.name}</h5>
                    <p className="card-text mb-1">{contact.address}</p>
                    <p className="card-text mb-1">{contact.phone}</p>
                    <p className="card-text mb-1">{contact.email}</p>
                </div>

                <div className="col-md-3 d-flex justify-content-end gap-3">
                    <Link to={`/editContact/${contact.id}`} className="btn btn-link p-0" title="Editar">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button type="button" className="btn btn-link p-0" onClick={handleDelete}>
                        <i className="fa-solid fa-delete-left"></i>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CardContact;
