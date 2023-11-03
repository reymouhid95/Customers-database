/* eslint-disable array-callback-return */
// Importation des bibliothèques et outils
import React, { useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

// Fonction principal du composant
function UserTable({ users, onEditUser, onDeleteUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Méthode pour afficher lemodal
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Méthode pour fermer le modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  // L'affichage
  return (
    <div>
      <div className="mb-1">
        <Row>
          <Col md={8}>
            {" "}
            <h2 className="fw-bold text-start px-3">Customers Details</h2>
          </Col>
          <Col md={4}>
            {" "}
            <Form className="mx-3">
              <Form.Control
                type="search"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1); // Reset to first page on new search
                }}
                className="rounded-5"
              />
            </Form>
          </Col>
        </Row>
      </div>
      <Table responsive striped bordered hover variant="bg-body-secondary">
        <thead>
          <tr>
            <th className="bg-light text-dark">#</th>
            <th className="bg-light text-dark">Name</th>
            <th className="bg-light text-dark">Address</th>
            <th className="bg-light text-dark">City</th>
            <th className="bg-light text-dark">Pin Code</th>
            <th className="bg-light text-dark">Country</th>
            <th className="bg-light text-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.postalCode}</td>
                <td>{user.country}</td>
                <td>
                  <Button
                    variant="outline-info border border-none"
                    className="mb-2 mx-2"
                    onClick={() => handleShowModal(user)}
                  >
                    <Icon.Eye />
                  </Button>
                  <Button
                    variant="outline-success"
                    className="mb-2 mx-2 text-warning border border-none"
                    onClick={() => onEditUser(user)}
                  >
                    <Icon.Pen />
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="mb-2 mx-2 border border-none"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    <Icon.Trash />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Row>
        <Col md={6}>
          <p className="text-start px-3">Showing 5 out of 26 entries</p>
        </Col>
        <Col md={6}>
          {" "}
          <div className="d-flex justify-content-end px-3">
            <ul
              className="pagination"
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              {users.length > usersPerPage &&
                Array(Math.ceil(users.length / usersPerPage))
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      className="page-item"
                      style={{ borderRadius: "5px" }}
                    >
                      <Button
                        className={`page-link ${
                          currentPage === index + 1
                            ? "bg-primary text-white"
                            : ""
                        }`}
                        onClick={() => paginate(index + 1)}
                        style={{ border: "none", borderRadius: "100px" }}
                      >
                        {index + 1}
                      </Button>
                    </li>
                  ))}
            </ul>
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} className="text-center">
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light fw-bold">
          {selectedUser && (
            <div>
              <p>Nom : {selectedUser.name}</p>
              <p>Adresse : {selectedUser.address}</p>
              <p>Ville : {selectedUser.city}</p>
              <p>Code postal : {selectedUser.postalCode}</p>
              <p>Pays : {selectedUser.country}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserTable;
