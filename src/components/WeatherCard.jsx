import { Card } from "react-bootstrap"

export default function WeatherCard(props)
{
    return (
        <section className="col-lg-4 col-md-6 col-12 g-4">
            <Card className="forcast-card">
                <Card.Body className="d-flex flex-column align-items-center">
                    <h2 className="text-center">{props.data.day}</h2>
                    <h6 className="text-center">{props.data.date}</h6>
                    <img src={props.data.iconURL} alt=""/>
                    <h3 className="text-center">{props.data.temp}&deg;C</h3>
                    <p  className="text-center">{props.data.description}</p>
                </Card.Body>
            </Card>
        </section>
    )
}