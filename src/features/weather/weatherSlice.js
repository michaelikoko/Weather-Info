import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export const getCurrent = createAsyncThunk(
    "weather/getCurrent",
    async function (_, thunkAPI) {
        const { city, API_KEY } = thunkAPI.getState().weather;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            localStorage.setItem("city", city);
            return response.data;
        }
        catch (error) {
            if (error.response.status === 404) return thunkAPI.rejectWithValue("404");
            return thunkAPI.rejectWithValue("An error occurred.");
        }
    }
);

export const getForcast = createAsyncThunk(
    "weather/getForcast",
    async function (_, thunkAPI) {
        const { city, API_KEY } = thunkAPI.getState().weather;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            return response.data;
        }
        catch (error) {
            if (error.response.status === 404) return thunkAPI.rejectWithValue("404");
            return thunkAPI.rejectWithValue("An error occurred.");
        }
    }
)

const initialState =
{
    API_KEY: process.env.REACT_APP_WEATHER_API_KEY,
    city: localStorage.getItem("city") || "london",
    getCurrentLoading: false,
    getCurrentFailed: false,
    getForcastLoading: false,
    getForcastFailed: false,
    weatherData: {
        name: '',
        country: '',
        data: '',
        temp: '',
        main: '',
        windSpeed: '',
        humidity: '',
        pressure: '',
        iconURL: ''
    },
    forcastData: [],
    invalidInput: false
};

const weatherSlice = createSlice(
    {
        name: "weather",
        initialState,
        reducers: {
            setCity: function (state, action) {
                state.city = action.payload;
            }
        },
        extraReducers: {
            [getCurrent.pending]: function (state, action) {
                state.getCurrentLoading = true;
                state.invalidInput = false;
            },

            [getCurrent.fulfilled]: function (state, action) {
                state.getCurrentLoading = false;
                state.weatherData = {
                    name: action.payload.name,
                    country: action.payload.sys.country,
                    data: `${moment().format('LL')}`,
                    temp: action.payload.main.temp,
                    description: action.payload.weather[0].description,
                    windSpeed: action.payload.wind.speed,
                    humidity: action.payload.main.humidity,
                    pressure: action.payload.main.pressure,
                    iconURL: `https://openweathermap.org/img/wn/${action.payload.weather[0].icon}@4x.png`
                };
            },

            [getCurrent.rejected]: function (state, action) {
                state.getCurrentLoading = false;
                if (action.payload === "404") {
                    state.invalidInput = true;
                    return
                }
                state.getCurrentFailed = true;
            },

            [getForcast.pending]: function (state, action) {
                state.getForcastLoading = true;
            },

            [getForcast.fulfilled]: function (state, action) {
                state.getForcastLoading = false;
                state.forcastData = action.payload.list.filter(reading => {
                    return reading.dt_txt.includes('12:00:00');
                });
            },

            [getForcast.rejected]: function (state, action) {
                state.getForcastLoading = false;
                if (action.payload === "404") return;
                state.getForcastFailed = true;
            }
        }
    }
);

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;