import WeatherCard from "../components/WeatherCard";
import NetworkError from "../components/NetworkError";
import moment from "moment";
import { Badge, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Forcast() {
    const { forcastData, weatherData, getForcastLoading, getForcastFailed } = useSelector(store => store.weather);

    const cardData = forcastData.map(data => {
        let date = new Date();
        const weekday = data.dt * 1000;
        date.setTime(weekday);

        return {
            day: moment(date).format('dddd'),
            date: data.dt_txt.slice(0, 10),
            iconURL: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            temp: data.main.temp,
            description: data.weather[0].description
        };

    });

    if (getForcastLoading) {
        return (
            <section className="d-flex flex-column align-items-center justify-content-center pt-5">
                <Spinner animation="border" size="lg" className="mt-5"/>
            </section>

        )
    };

    if (getForcastFailed) {
        return (
            <NetworkError />
        )
    };

    return (
        <section className="d-flex flex-column align-items-center justify-content-center pt-5 pb-5 ps-3 pe-3">
            <h2 className="text-dark mb-3 ">{weatherData.name} <Badge pill bg="warning">{weatherData.country}</Badge></h2>
            <section className="container row">
                {
                    cardData.map((data, index) => (
                        <WeatherCard data={data} key={index} />
                    ))
                }
            </section>
        </section>
    );
};