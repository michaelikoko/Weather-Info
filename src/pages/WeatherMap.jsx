import { MapContainer, TileLayer} from 'react-leaflet';
import NetworkError from '../components/NetworkError';
import { useSelector } from 'react-redux';

export default function WeatherMap(props)
{
    const { getCurrentFailed, API_KEY } = useSelector(store => store.weather);

    if (getCurrentFailed)
    {
        return (
            <NetworkError />
        )
    };

    return (
        <section className='container d-flex flex-column align-items-center'>
            <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false} className="map mt-5 mb-5">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <TileLayer
                    url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    zIndex={10}
                />
            </MapContainer>            
        </section>
    );
};

