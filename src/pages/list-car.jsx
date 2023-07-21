import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";

export default function ListCar() {
  const [carData, setCarData] = useState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [carId, setCarId] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  const addCar = () => {
    navigate("/addnew");
  };

  const editCar = (id) => {
    navigate(`/editcar/${id}`);
  };

  const config = {
    headers: {
      access_token: localStorage.getItem("token"),
    },
  };

  const fetchCarData = async () => {
    try {
      const response = await axios.get(
        "https://api-car-rental.binaracademy.org/admin/v2/car",
        config
      );
      setCarData(response.data);
    } catch (error) {
      console.log("Error fetching car data:", error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        config
      );

      fetchCarData();
      setShowModal(false);
    } catch (error) {
      console.log("Kesalahan dalam menghapus mobil", error);
    }
  };

  const deleteConfirm = (id) => {
    setCarId(id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  return (
    <Container>
      <div
        className="list-car d-flex justify-content-between pt-5 "
        style={{ zIndex: "2" }}
      >
        <div>
          <h3>List Car</h3>
          <DeleteModal
            showModal={showModal}
            handleClose={handleClose}
            deleteCar={() => deleteCar(carId)}
          />
        </div>
        <div>
          <Button variant="primary" onClick={addCar}>
            + Add New Car
          </Button>
        </div>
      </div>
      <div className="content pt-3">
        <div className="category d-flex gap-2">
          <div>
            <Button
              variant="link"
              style={{
                border: "1px solid blue",
                borderRadius: "2px",
              }}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              style={{ border: "1px solid blue", borderRadius: "2px" }}
              onClick={() => setSelectedCategory("small")}
            >
              2 - 4 People
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              style={{ border: "1px solid blue", borderRadius: "2px" }}
              onClick={() => setSelectedCategory("medium")}
            >
              4 - 6 People
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              style={{ border: "1px solid blue", borderRadius: "2px" }}
              onClick={() => setSelectedCategory("large")}
            >
              6 - 8 People
            </Button>
          </div>
        </div>
      </div>
      <div className="cars pt-3">
        <Row>
          {carData && carData.cars && carData.cars.length > 0 ? (
            carData.cars
              .filter((car) =>
                selectedCategory === "All"
                  ? true
                  : car.category === selectedCategory
              )
              .map((car) => (
                <Col key={car.id} lg={3}>
                  <Card className="mb-3">
                    <Card.Img
                      src={car.image}
                      style={{ height: "200px", width: "100%" }}
                    />
                    <Card.Body>
                      <Card.Text>{car.name}</Card.Text>
                      <Card.Title>Rp {car.price} / Hari</Card.Title>
                      <Card.Text>{car.category}</Card.Text>
                      <Card.Text>
                        Updated At{" "}
                        {new Date(car.updatedAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                        })}
                      </Card.Text>
                      <div className="d-inline-flex gap-3">
                        <div>
                          <Button
                            variant="link"
                            style={{
                              border: "1px solid green",
                              color: "green",
                              width: "130px",
                            }}
                            onClick={() => deleteConfirm(car.id)}
                          >
                            Delete
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="del-btn"
                            variant="success"
                            style={{ width: "130px" }}
                            onClick={() => editCar(car.id)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          ) : (
            <div className="text-center">Please Wait...</div>
          )}
        </Row>
      </div>
    </Container>
  );
}
