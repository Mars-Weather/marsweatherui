import styled from 'styled-components';
import {getWeekSols} from "../services/services";
import {Card} from "react-bootstrap";

function WeekData() {
    return (
        <Container>
            <Card border="dark" style={{ width: '18rem', marginTop: "3rem", 
                                        backgroundColor: "rgba(227, 227, 227, 0.8)", 
                                        color: "black"}}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default WeekData;

const Container = styled.div`
    min-height: calc(100vh - 70px); 
    position: relative; 
    overflow-x: hidden; 
    padding: 0 calc(3.5vw + 5px);
    color: white; 
    
    &:before{
        background: url("/images/mars.jpg") center center / cover no-repeat;
        position: absolute;
        content:"";
        opacity: 0.8;
        top: 0;
        left: 0; 
        right: 0;
        bottom: 0; 
        z-index: -1; 
    }
`;