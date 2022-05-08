import {useState, useEffect} from "react";
import styled from "styled-components";
import {getWeekSols} from "../services/services";

import "../stylesheets/styles.css";
import data from "bootstrap/js/src/dom/data";

/**
 * Week data component fetches and displays the data for the last 7 days
 * @returns data for the last seven days
 */
const WeekData = ({}) => {
    /**
     * Measurement units for temperature, pressure and speed
     * @type {string} all measument units are of type string
     */
    const temp_fahrenheit = "° F";
    const pressure = "PA";
    const speed = "m/s";
    const [weekData, setWeekData] = useState("");
    const [error, setError] = useState("");

    /**
     * Fetching data for the last 7 sols
     */
    useEffect(() => {
        (async () => {
            getWeekSols.then(setWeekData).catch(setError);
        })();
    }, []);

    const data_output = (item, unit) => {
        let result = "";

        if (item == null) {
            result = "No data available"
        } else {
            result = item + " " + unit;
        }
        return result;
    }

    /**
     * Function that maps and displays week data
     * @returns rendered week data
     */
    const display_week_data = () => {
        let week_render = "";
        if (weekData) {
            let week = weekData;
            week_render = week.map((item) => {
                return (
                    <div key={item.id} className="card" border="dark">
                        <div className="heading">Sol: {item.solNumber}</div>
                        <p className="heading">Temperature</p>
                        <p>Min: {data_output(item.temperature.minimum, temp_fahrenheit)} </p>
                        <p>Max: {data_output(item.temperature.maximum, temp_fahrenheit)} </p>
                        <p>AVG: {data_output(item.temperature.average, temp_fahrenheit)} </p>
                        <p className="heading"> Pressure </p>
                        <p>Min: {data_output(item.pressure.minimum, pressure)} </p>
                        <p>Max: {data_output(item.pressure.maximum, pressure)} </p>
                        <p>AVG: {data_output(item.pressure.average, pressure)} </p>
                        <p className="heading">Wind speed</p>
                        <p>Min: {data_output(item.wind.minimum, speed)} </p>
                        <p>Max: {data_output(item.wind.maximum, speed)} </p>
                        <p>AVG: {data_output(item.wind.average, speed)} </p>
                        <p>Direction: {data_output(item.wind.mostCommonDirection, "")} </p>
                    </div>
                );
            });
        }
        return week_render;
    };

    return (
        <Container>
            <CardContainer>{display_week_data()}</CardContainer>
        </Container>
    );
};

export default WeekData;

const Container = styled.div`
    min-height: calc(100vh - 70px);
    position: relative;
    overflow-x: hidden;
    padding: 0 calc(3.5vw + 5px);
    color: white;
    .heading {
        font-weight: bold;
    }
    &:before {
        background: url("/images/mars.jpg") center center / cover no-repeat;
        position: absolute;
        content: "";
        opacity: 0.8;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`;

const CardContainer = styled.div`
    overflow: hidden;
    display: flex;
    margin-top: 2rem;
`;
