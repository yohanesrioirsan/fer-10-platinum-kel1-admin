import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddNew() {
  const navigate = useNavigate();

  const [carData, setCarData] = useState({
    name: "",
    price: 0,
    image: null,
    category: "2-4 orang",
    createdAt: "",
    updatedAt: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4ODQ5NzQ5Mn0.MwTVL8MvIR0R61s95gt6lhLaTzk1nIsawhjW7cHUaII";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", carData.name);
      formData.append("price", carData.price);
      formData.append("image", carData.image);
      formData.append("category", carData.category);
      formData.append("createdAt", carData.createdAt);
      formData.append("updatedAt", carData.updatedAt);

      const response = await axios.post("https://api-car-rental.binaracademy.org/admin/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      navigate("/list-car");
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
      <h3 className="mt-5">Add New Car</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Label column sm="2">
            Nama/Tipe Mobil<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Col sm="4">
            <Form.Control type="text" name="name" value={carData.name} onChange={handleChange} required />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Harga<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Col sm="4">
            <Form.Control type="number" name="price" value={carData.price} onChange={handleChange} required />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Foto<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Col sm="4">
            <Form.Control type="file" name="image" onChange={handleChange} required />
            <Form.Text className="text-muted">Max file size: 2MB</Form.Text>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm="2">
            Kategori<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Col sm="4">
            <Form.Control as="select" name="category" value={carData.category} onChange={handleChange} required>
              <option value="2-4 orang">2-4 orang</option>
              <option value="4-6 orang">4-6 orang</option>
              <option value="6-8 orang">6-8 orang</option>
            </Form.Control>
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

        <Button variant="secondary" className="ml-2 me-3" onClick={handleCancel} style={{ backgroundColor: "white", borderColor: "#0D28A6", color: "black" }}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" style={{ backgroundColor: "#0D28A6" }}>
          Save
        </Button>
      </Form>
    </Container>
  );
}
