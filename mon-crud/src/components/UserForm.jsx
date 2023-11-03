// Importation des bibliothèques et outils
import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import UserTable from "./UserTable";

// Composant principal pour les méthodes d'ajout, de modification et de suppression
function UserForm() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(true);

  // Surveiller le chargement des données au montage de l'aooli
  const loadUsers = useCallback(async () => {
    try {
      const userCollection = collection(db, "users");
      const snapshot = await getDocs(userCollection);
      const userData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Error loading users:", error);
      alert(
        "Erreur de chargement. Veuillez vérifier votre connexion internet!"
      );
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Ajouter un utilisateur
  const handleAddUser = useCallback(async () => {
    const user = formData;

    await addDoc(collection(db, "users"), user);
    await loadUsers();
    // Réinitialisation des champs après l'ajout
    setFormData({
      name: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
  }, [formData, loadUsers]);

  // Mettre à jour d'un utilisateur
  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
    });
    setIsAdding(false);
    setSelectedUser(user);
  };

  // Faire la mise à jour sans ajouter un nouveau champ dans le tableau
  const handleUpdateUser = async () => {
    if (selectedUser) {
      await updateDoc(doc(db, "users", selectedUser.id), formData);
      await loadUsers();
      setFormData({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      });
      setIsAdding(true);
      setSelectedUser(null);
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = useCallback(
    async (userId) => {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
    },
    [users]
  );

  // Soummission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) {
      await handleAddUser();
    } else {
      await handleUpdateUser();
    }
  };

  // Surveiller l'état du bouton
  const buttonText = isAdding ? "Ajouter" : "Mise à jour";

  // L'affichage
  return (
    <div className="mt-2">
      <h1>Customers Database</h1>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} sm={12} xs={12} className="mb-2">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Col>
            <Col md={6} sm={12} xs={12} className="mb-2">
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12} xs={12} className="mb-2">
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                placeholder="City"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </Col>
            <Col md={4} sm={12} xs={12} className="mb-2">
              <Form.Control
                type="number"
                name="postalCode"
                value={formData.postalCode}
                placeholder="Postal Code"
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                required
              />
            </Col>
            <Col md={4} sm={12} xs={12} className="mb-2">
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                placeholder="Country"
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
              />
            </Col>
          </Row>
          <Button
            // variant="outline-primary"
            type="submit"
            className="soumission mt-2 mb-3"
          >
            {buttonText}
          </Button>
        </Form>
      </Container>
      <UserTable
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default UserForm;
