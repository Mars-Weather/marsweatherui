import react from 'react';
import styled from 'styled-components';

function FrontPage() {
    return (
        <Container>
            <Subcontainer>
                <LeftColumn>
                    <p>80 ° F</p>
                    <p>761 PA</p>
                </LeftColumn>
                <CenterColumn>
                    <p>Season: summer</p>
                </CenterColumn>
                <RightColumn>
                    <Button>More data</Button>
                </RightColumn>
            </Subcontainer>

        </Container>
    );
}

export default FrontPage;
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
`
const LeftColumn = styled.div`
    min-height: 70vh; 
    width: 30vw; 
    font-size: 100px; 
`
const RightColumn = styled.div`
    position: fixed; 
    right: 30px;; 
    bottom: 30px; 
`
const CenterColumn = styled.div`
    width: 30vw;
    text-align: center;
    font-size: 45px; 
`

const Button = styled.div`
    height: 40px; 
    width: 258px; 
    color: white;
    display: flex; 
    justify-content: center; 
    background-color: rgba(23, 26, 32, 0.8);
    border-radius: 100px; 
    opacity:0.65;
    text-transform: uppercase;
    align-items: center;
    cursor: pointer; 
`
const Subcontainer = styled.div`
    padding: 50px; 
    display: flex; 
`
