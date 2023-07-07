import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCar() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [carData, setCarData] = useState({
    name: "",
    price: 0,
    image: "",
    category: "2-4 orang",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `https://api-car-rental.binaracademy.org/admin/car/${carId}`,
          {
            headers: {
              access_token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4ODQ5NzQ5Mn0.MwTVL8MvIR0R61s95gt6lhLaTzk1nIsawhjW7cHUaII",
            },
          }
        );
        const car = response.data;
        setCarData({
          name: car.name,
          price: car.price,
          image: car.image,
          category: car.category,
        });
      } catch (error) {
        console.log("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [carId]);

  const sendRequest = async (formData) => {
    try {
      const response = await axios.put(
        `https://api-car-rental.binaracademy.org/admin/car/${carId}`,
        formData,
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4ODQ5NzQ5Mn0.MwTVL8MvIR0R61s95gt6lhLaTzk1nIsawhjW7cHUaII",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/list-car");
    } catch (error) {
      console.error(error);
      setErrorMessage("Terjadi kesalahan pada jaringan atau database.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", carData.name);
      formData.append("price", carData.price);

      if (carData.image) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(carData.image);
        fileReader.onloadend = () => {
          const base64Image = fileReader.result;
          formData.append("image", base64Image);
          sendRequest(formData);
        };
      } else {
        sendRequest(formData);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Terjadi kesalahan pada jaringan atau database.");
    }
  };

  const handleCancel = () => {
    navigate("/list-car");
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      const file = event.target.files[0];
      setCarData({ ...carData, image: file });
    } else {
      setCarData({ ...carData, [event.target.name]: event.target.value });
    }
  };

  return (
    <Container>
      <h3 className="mt-5">Edit Car</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Nama/Tipe Mobil</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                value={carData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                name="price"
                value={carData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Foto</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Control type="file" name="image" onChange={handleChange} />
              <Form.Text className="text-muted">Max file size: 2MB</Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                name="category"
                value={carData.category}
                onChange={handleChange}
                required
              >
                <option value="2-4 orang">2-4 orang</option>
                <option value="4-6 orang">4-6 orang</option>
                <option value="6-8 orang">6-8 orang</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Created At
          </Form.Label>
          <Col sm="4">-</Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Updated At
          </Form.Label>
          <Col sm="4">-</Col>
        </Row>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <Button
          variant="secondary"
          className="ml-2 me-3"
          onClick={handleCancel}
          style={{
            backgroundColor: "white",
            borderColor: "#0D28A6",
            color: "black",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "#0D28A6" }}
        >
          Save
        </Button>
      </Form>
    </Container>
  );
}
