import {Table} from "react-bootstrap";
import {getSolsByDate} from "../services/services";
import {useState, useEffect} from "react";

/**
 * Component that fetches sols according to given date and displays sol data in the form of table.
 * @param
 * @param
 * @returns
 * @constructor
 */
const SolsTable = (props) => {
    const [data, setData] = useState("");
    const [error, setError] = useState(null);
    const no_data = "--";
    const temp_unit = "° F";
    const PRESSURE_UNIT = "PA";
    const WIND_SPEED_UNIT = "m/s";

    /**
     * fetching the data according to the given starting and ending dates
     */
    useEffect(() => {
        getSolsByDate(props.starting_date, props.ending_date)
            .then(setData)
            .catch(setError)
    }, []);

    const render_table = () => {
        if (!data) {
            return "Data is not loaded";
        }

        if (data['$values'].length === 0) {
            return "No available data on this date";
        }


        const items = data['$values'].map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.solNumber}</td>
                    <td>{item.season ? item.season : no_data}</td>
                    <td>{item.temperature.average ? item.temperature.average.toFixed(2) : no_data}</td>
                    <td>{item.temperature.minimum ? item.temperature.minimum.toFixed(2) : no_data}</td>
                    <td>{item.temperature.maximum ? item.temperature.maximum.toFixed(2) : no_data}</td>
                    <td>{item.pressure.average ? item.pressure.average.toFixed(2) : no_data}</td>
                    <td>{item.pressure.minimum ? item.pressure.minimum.toFixed(2) : no_data}</td>
                    <td>{item.pressure.maximum? item.pressure.maximum.toFixed(2) : no_data}</td>
                    <td>{item.wind.average? item.wind.average.toFixed(2) : no_data}</td>
                    <td>{item.wind.minimum? item.wind.minimum.toFixed(2) : no_data}</td>
                    <td>{item.wind.maximum? item.wind.maximum.toFixed(2) : no_data}</td>
                </tr>
            )
        });
        return (<Table striped bordered hover>
            <thead>
            <tr>
                <th>Sol number</th>
                <th>Season</th>
                <th>Temperature AVG</th>
                <th>Temperature MIN</th>
                <th>Temperature MAX</th>
                <th>Pressure AVG</th>
                <th>Pressure MIN</th>
                <th>Pressure MAX</th>
                <th>Windspeed AVG</th>
                <th>Windspeed MIN</th>
                <th>Windspeed MAX</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td>{temp_unit}</td>
                <td>{temp_unit}</td>
                <td>{temp_unit}</td>
                <td>{PRESSURE_UNIT}</td>
                <td>{PRESSURE_UNIT}</td>
                <td>{PRESSURE_UNIT}</td>
                <td>{WIND_SPEED_UNIT}</td>
                <td>{WIND_SPEED_UNIT}</td>
                <td>{WIND_SPEED_UNIT}</td>
            </tr>
            {items}
            </tbody>
        </Table>);
    }

    return (
        render_table()
    );

}

export default SolsTable;