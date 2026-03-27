import { Link } from "react-router-dom";

const CardContact = ({ contact, onDeleted = () => {} }) => {
	const modalId = `delete-contact-${contact.id}`;

	const handleDelete = async () => {
		try {
			await fetch(`https://playground.4geeks.com/contact/agendas/manuel1991/contacts/${contact.id}`, {
				method: "DELETE"
			});
			onDeleted();
		} catch (error) {
			console.error("Error al borrar contacto:", error);
		}
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

					<button type="button" className="btn btn-link p-0" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
						<i className="fa-solid fa-delete-left"></i>
					</button>

					<div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5">Eliminar contacto</h1>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>

								<div className="modal-body">
									Si borras este contacto, no se puede recuperar.
								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
										Cancelar
									</button>
									<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default CardContact;
