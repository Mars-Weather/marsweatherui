import styled from 'styled-components';

function WeekData() {
    return (
        <Container>
            <p>PAGE IS UNDER CONSTRUCTION</p>
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