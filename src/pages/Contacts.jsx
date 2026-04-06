import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import CardContact from "../components/CardContact";

const Contacts = () => {
    const { contacts, getContacts } = useGlobalReducer();

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
                    <CardContact contact={contact} key={contact.id} />
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
