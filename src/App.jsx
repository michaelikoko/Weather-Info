import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import Current from "./pages/Current";
import Forcast from "./pages/Forcast";
import WeatherMap from "./pages/WeatherMap";
import Error from "./pages/Error";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrent, getForcast } from "./features/weather/weatherSlice";

export default function App()
{
    const dispatch = useDispatch();
    useEffect(
        function()
        {
            dispatch(getCurrent());
            dispatch(getForcast());
        },
        []
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<Current />} />
                    <Route path="forcast" element={<Forcast />} />
                    <Route path='temp_map' element={<WeatherMap />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};