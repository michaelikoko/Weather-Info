import { Container, Form, Button, Card, Spinner, Badge } from "react-bootstrap";
import NetworkError from "../components/NetworkError";
import { useSelector, useDispatch } from "react-redux";
import { setCity, getCurrent, getForcast } from "../features/weather/weatherSlice";

export default function Current(props)
{
    const dispatch = useDispatch();
    const { getCurrentLoading, getCurrentFailed, weatherData, invalidInput} = useSelector(store => store.weather);

    function inputChange(event)
    {
        const { name, value } = event.target;
        console.log(name);
        dispatch(setCity(value));
    };

    function submit(event)
    {
        event.preventDefault();
        dispatch(getCurrent());
        dispatch(getForcast());
    };

    if (getCurrentLoading)
    {
        return (
            <Container className="p-5 d-flex flex-column align-items-center justify-content-center">
                <section className="d-flex flex-row align-items-center justify-content-center">
                        <Form.Group controlId="cityName">
                            <Form.Control type="text" placeholder="Input city name" />
                        </Form.Group>
                    <Button variant="primary" type="submit" className="ms-3">Search</Button>
                </section>

                <section className="mt-3">
                    <Card className="wheather-card" style={{height: "20rem" , width: "20rem"}}>
                        <Card.Body className="p-4 d-flex justify-content-center align-items-center">
                            <Spinner animation="border" size="lg"/>
                        </Card.Body>
                    </Card>
                </section>
            </Container>
        );
    };

    if (getCurrentFailed)
    {
        return (
            <NetworkError />
        );
    };

    return (
        <Container className="p-5 d-flex flex-column align-items-center justify-content-center">
            <section className="d-flex flex-column">
                { invalidInput && <p className="text-danger invalid-input">Enter a valid city name</p> }
                <Form className="d-flex flex-row align-items-center justify-content-center" onSubmit={submit}>
                        <Form.Group controlId="cityName">
                            <Form.Control 
                                type="text" 
                                placeholder="Input city name" 
                                onChange={inputChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="ms-3">Search</Button>
                </Form>
            </section>

            <section className="mt-3">
                <Card className="wheather-card">
                    <Card.Body className="p-4">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <p className="fw-bold">{weatherData.name} <Badge bg="warning" pill>{weatherData.country}</Badge></p>
                            <p className="fw-bold">{weatherData.data}</p>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
                            <Card.Title className="fs-1">{weatherData.temp}&deg;C</Card.Title>
                            <Card.Subtitle className="fs-5 fw-light">{weatherData.description}</Card.Subtitle>
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div>
                                <p className="fw-light"><span className="fw-bold">Wind:</span> {weatherData.windSpeed}km/h </p>
                                <p className="fw-light"><span className="fw-bold">Humidity:</span> {weatherData.humidity}% </p>
                                <p className="fw-light"><span className="fw-bold">Pressure:</span> {weatherData.pressure}Pa </p>
                            </div>
                            <div>
                                <img src={weatherData.iconURL} alt="" className="img-fluid"/>
                            </div>
                        </div>

                    </Card.Body>
                </Card>
            </section>
        </Container>
    );
};