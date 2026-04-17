import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
  Navbar,
  Container,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "./App.css";
import FormUser from "./components/FormUser.jsx";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [city, setCity] = useState("Pavel Banya");

  async function fetchWeatherData() {
    const url = `http://api.weatherapi.com/v1/current.json?key=d6ce62916af44a0fa35115504252112&q=${city}&aqi=yes`;

    const response = await fetch(url);

    if (!response.ok) {
      alert("Network response was not ok");
      return;
    }
    setCity("");
    return await response.json();
  }

  async function getData() {
    const data = await fetchWeatherData();
    if (!data) {
      return;
    }
    setWeatherData(data);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  if (!weatherData) {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" fixed="top">
          <Container fluid>
            <Navbar.Brand>Weather</Navbar.Brand>
            <Form className="ms-auto">
              <Row>
                <Col>
                  <Form.Control
                    id="searchInput"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button>Search</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Navbar>

        <Carousel
          data-bs-theme="dark"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Carousel.Item
            style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
          >
            <Carousel.Caption className="captionStyle">
              <h5>Loading...</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    );
  }

  const location = weatherData.location;
  const current = weatherData.current;

  function handleCarouselSelect(selectedIndex) {
    setCarouselIndex(selectedIndex);
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container
          fluid
          className="d-flex align-items-center position-relative"
        >
          <Navbar.Brand>Weather</Navbar.Brand>

          <Navbar.Brand className="position-absolute start-50 translate-middle-x text-center">
            Location: <strong>{location.name}</strong>
          </Navbar.Brand>

          <Form className="ms-auto">
            <Row>
              <Col>
                <Form.Control
                  id="searchInput"
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
              <Col>
                <Button onClick={getData}>Search</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>

      <Carousel
        id="weatherCarousel"
        data-bs-theme="dark"
        activeIndex={carouselIndex}
        onSelect={handleCarouselSelect}
        indicators={false}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Carousel.Item style={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
          <Carousel.Caption className="position-absolute top-0 start-50 translate-middle-x mt-5 text-center">
            <h4 style={{ color: "#343a40" }}>
              Local Time: {location.localtime}
            </h4>
          </Carousel.Caption>
          <Carousel.Caption className="captionStyle">
            <p>Region: {location.region}</p>
            <p>Country: {location.country}</p>
            <p>Timezone: {location.tz_id}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "100vh", backgroundColor: "#eee" }}>
          <Carousel.Caption className="position-absolute top-0 start-50 translate-middle-x mt-5 text-center">
            <h4 style={{ color: "#343a40" }}>
              Current / Last updated: {current.last_updated}
            </h4>
          </Carousel.Caption>
          <Carousel.Caption className="captionStyle">
            <p>Temp (°C): {current.temp_c}</p>
            <p>Condition: {current.condition.text}</p>
            <p>Wind (kph): {current.wind_kph}</p>
            <p>Humidity: {current.humidity}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "100vh", backgroundColor: "#e5e5e5" }}>
          <Carousel.Caption className="top-0 start-50 translate-middle-x mt-5 text-center">
            <h4 style={{ color: "#343a40" }}>
              More: Feels like (°C): {current.feelslike_c}
            </h4>
          </Carousel.Caption>
          <Carousel.Caption className="captionStyle">
            <p>Cloud: {current.cloud}</p>
            <p>Air quality CO: {current.air_quality.co}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

       <footer
        bg="dark"
        data-bs-theme="dark"
        className="position-abso bottom-0 start-0 end-0 z-3"
      >
        <div className="carousel-indicators">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#weatherCarousel"
              aria-label={`Slide ${i + 1}`}
              className={i === carouselIndex ? "active" : undefined}
              aria-current={i === carouselIndex ? "true" : undefined}
              onClick={() => setCarouselIndex(i)}
            />
          ))}
        </div>
      </footer>
      <div className="fluid mt-5 p-5">
        <FormUser />
      </div>
    </>
  );
}
