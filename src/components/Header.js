import react from 'react';
import styled from 'styled-components';

function Header() {
    return (
      <Nav>
          {/*image source: https://freesvg.org/mars-planet*/}
          <a><img src="/images/mars-logo.png" alt=""/></a>
          <a>Mars-Weather</a>
          <NavMenu>
            <a><span>Today</span></a>
            <a><span>7 days</span></a>
          </NavMenu>
          <RightMenu>
              <LeftButton><span>F</span></LeftButton>
              <RightButton><span>C</span></RightButton>
          </RightMenu>
      </Nav>
    );
  }
  
  export default Header;

  const Nav = styled.nav`
    height: 80px; 
    background: #090b13;
    display: flex; 
    align-items: center; 
    padding: 0 36px; 
    overflow-x: hidden; 

    a{
        color: #ebe8e1;
    }

    img{
        height: 80px; 
    }
`

const NavMenu = styled.div`
    display:flex; 
    flex: 1; 
    margin-left: 25px; 
    align-items: center; 
    justify-content: center;

  a{
      color: #ebe8e1; 
      display:flex;
      align-items: center; 
      padding: 0 30px; 
      cursor: pointer; 

      span{
        font-size: 13px; 
        letter-spacing: 1.42px; 
        font-weight: 600;
        text-transform: uppercase; 
        position: relative; 

        :after{
            content:"";
            height: 2px; 
            background: #ebe8e1; 
            position: absolute; 
            left: 0;
            right: 0; 
            bottom: -6px;
            opacity: 0; 
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform-origin: left center; 
        }
    }

    &:hover{
        span:after{
            transform: scaleX(1);
            opacity: 1; 
        }
    }
  }
`
const RightMenu = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
`
const LeftButton = styled.div`
  color: #ebe8e1;
  border-style: solid;
  border-color: #ebe8e1; 
  margin-right: 10px; 
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  display: flex;
`
const RightButton = styled(LeftButton)``