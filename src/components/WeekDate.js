import { useState, useEffect } from "react";
import styled from "styled-components";
import { getWeekSols } from "../services/services";

import "../stylesheets/styles.css";

/**
 * Week data component fetches and displays the data for the last 7 days
 * @returns data for the last seven days
 */
const WeekData = ({}) => {
    const [weekData, setWeekData] = useState("");
    const [error, setError] = useState("");

    /**
     * Fetching all data
     */
    useEffect(() => {
        let isMounted = true;
        (async () => {
            getWeekSols()
                .then((obj) => {
                    if (isMounted) {
                        setWeekData(obj);
                    }
                })
                .catch((err) => setError(err));
        })();
        return () => {
            isMounted = false;
        };
    }, []);

    /**
     * Funcktion that maps and displays week data
     * @returns rendered week data
     */
    const display_week_data = () => {
        let week_render = "";
        if (weekData) {
            //let days_nbr = weekData["$values"].length - 7; // 7 last days in DB, to change when data comes from Nasa API
            // take 7 last sols
            let week = weekData["$values"]
                .sort((a, b) =>
                    parseInt(a.solNumber) > parseInt(b.solNumber) ? -1 : 1
                )
                .slice(0, 7);
            week = week.sort((a, b) =>
                parseInt(a.solNumber) < parseInt(b.solNumber) ? -1 : 1
            ); //to change when the data will come from Nasa API
            week_render = week.map((item) => {
                return (
                    <div key={item.id} className="card" border="dark">
                        <div className="heading">Sol: {item.solNumber}</div>
                        <p className="heading">Temperature</p>
                        <p>Min: {item.temperature.minimum}° F</p>
                        <p>Max: {item.temperature.maximum}° F</p>
                        <p>AVG: {item.temperature.average}° F</p>
                        <p className="heading">Pressure</p>
                        <p>Min: {item.pressure.minimum} PA </p>
                        <p>Max: {item.pressure.maximum} PA </p>
                        <p>AVG: {item.pressure.average} PA </p>
                        <p className="heading">Wind speed</p>
                        <p>Min: {item.wind.minimum} m/s</p>
                        <p>Max: {item.wind.maximum} m/s</p>
                        <p>AVG: {item.wind.average} m/s</p>
                        <p>Direction: {item.wind.mostCommonDirection}</p>
                    </div>
                );
            });
        }
        return week_render;
    };

    /**
     * Function that displays today sol number
     * @returns today sol number (data type: number)
     */
    const showTodaySol = () => {
        let today_sol = "";
        if (weekData) {
            //let last_day = weekData["$values"].length - 1;
            today_sol = weekData["$values"].slice(6, 7)[0].solNumber;
        }
        return today_sol;
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
