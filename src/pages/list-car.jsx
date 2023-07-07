import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListCar() {
  const [carData, setCarData] = useState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const addCar = () => {
    navigate("/addnew");
  };

  const editCar = (car) => {
    navigate(`/editcar/${car.id}`, { state: { car } });
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
              onClick={() => setSelectedCategory("2 - 4 orang")}
            >
              2 - 4 People
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              style={{ border: "1px solid blue", borderRadius: "2px" }}
              onClick={() => setSelectedCategory("4 - 6 orang")}
            >
              4 - 6 People
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              style={{ border: "1px solid blue", borderRadius: "2px" }}
              onClick={() => setSelectedCategory("6 - 8 orang")}
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
