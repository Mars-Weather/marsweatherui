import react, {useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

function Header({set_Fahrenheit, set_Celsius, currentSolNum}) {
    return (
        <Nav>
            <LeftMenu>
                {/*image source: https://freesvg.org/mars-planet*/}
                <Link to="/">
                    <img src="/images/mars-logo.png" alt="mars-logo"/>
                </Link>
                {/* change to p, make div, make div pos left and rignth only */}
                <p>Mars-Weather</p>
                <p className="current-sol">Current Sol: {currentSolNum}</p>
            </LeftMenu>
            <NavMenu>
                <Link className="nav-link" to="/">
                    <span>Today</span>
                </Link>
                <Link className="nav-link" to="/weekData">
                    <span>7 days</span>
                </Link>
                <Link className="nav-link" to="/statistics">
                    <span>Statistics</span>
                </Link>
                <Link className="nav-link" to="/solselector">
                    <span>SolSelector</span>
                </Link>
            </NavMenu>
            <RightMenu>
                <LeftButton onClick={() => set_Fahrenheit()}>
                    <span>° F</span>
                </LeftButton>
                <RightButton onClick={() => set_Celsius()}>
                    <span>° C</span>
                </RightButton>
            </RightMenu>
        </Nav>
    );
}

export default Header;

const Nav = styled.nav`
                height: 4.375rem;
                background: #090b13;
                display: flex;
                align-items: center;
                padding: 0 36px;
                overflow: hidden;
                opacity: 0.9;
                justify-content: center;

            a {
                color: #ebe8e1;
            }

            .nav-link {
                text-decoration: none;
            }
`;

const LeftMenu = styled.div`
                height: 4.375rem;
                display: flex;
                align-items: center;
                position: absolute;
                left: 2rem;

           p {
                color: #ebe8e1;
                margin: 0;
                font-size: 1.2rem;
            }

            .current-sol {
                padding-left: 5rem;
            }

            img {
                height: 75px;
                padding-top: 5px;
            }
                `;

const NavMenu = styled.div`
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                color: #ebe8e1;
                display: flex;
                align-items: center;
                padding: 0 30px;
                cursor: pointer;

                span {
                font-size: 13px;
                letter-spacing: 1.42px;
                font-weight: 600;
                text-transform: uppercase;
                position: relative;

                :after {
                content: "";
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

                &:hover {
                span:after {
                transform: scaleX(1);
                opacity: 1;
            }
            }
            }
                `;
const RightMenu = styled.div`
                display: flex;
                align-items: center;
                text-transform: uppercase;
                position: absolute;
                right: 2rem;
                `;
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
                user-select: none;

                :hover {
                cursor: pointer;
                box-shadow: 0px 0px 7.5px 4px white;
            }

                :active {
                transform: translateY(2px);
            }
                `;
const RightButton = styled(LeftButton)``;