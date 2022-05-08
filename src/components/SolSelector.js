import react, {useState} from "react";
import DatePicker from "react-datepicker";
import {Form, Button} from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import SolsTable from "./SolsTable";


/**
 * SolSelector component that allows user to choose information to display
 * @returns {JSX.Element}
 * @constructor
 */
const SolSelector = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tableVisible, setTableVisible] = useState(false);

    const selectData = (e) => {
        e.preventDefault();
        setTableVisible(true);
    };

    const clearData = () => {
        setTableVisible(false);
    };

    return (
        <Container>
            <Form className="form-style">
                <Form.Group className="mb-3" controlId="datePicker">
                    <Form.Label>Choose a starting date</Form.Label>
                    <DatePicker className="date-button" selected={startDate} onChange={(date) => setStartDate(date)}/>
                    <Form.Label>Choose an ending date</Form.Label>
                    <DatePicker className="date-button" selected={endDate} onChange={(date) => setEndDate(date)}/>
                </Form.Group>
                <Button className="select-btn" type="submit" onClick={selectData}>
                    SELECT
                </Button>
                <Button className="select-btn" type="submit">
                    CLEAR
                </Button>
                <Result>
                    {tableVisible ?
                        <SolsTable starting_date={startDate.toISOString()} ending_date={endDate.toISOString()}/> : ""}
                </Result>
            </Form>
        </Container>
    );
}

export default SolSelector;

const Container = styled.div`
    min-height: calc(100vh - 70px);
    position: relative;
    overflow-x: hidden;
    padding: 0 calc(3.5vw + 5px);
    color: #d9d9d9;
    

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

const Result = styled.div`
    font-size: 1.2rem; 
`;
