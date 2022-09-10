import { NavLink } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

export default function Navigation() {
    return (
        <Navbar expand="md" className="navbar" variant="dark">
            <Navbar.Brand className="text-white fw-bold ms-3">
                <NavLink to="" className="text-decoration-none text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 navbar-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    <span className="ms-2">
                        Weather Info
                    </span>
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ms-auto me-5 ">
                    <NavLink
                        to={'/'}
                        className={({ isActive }) => {
                            return isActive ? "text-decoration-none text-info navbar-link ms-5" : "text-decoration-none navbar-link ms-5"
                        }}
                    >
                        Current
                    </NavLink>

                    <NavLink
                        to={'/forcast'}
                        className={({ isActive }) => {
                            return isActive ? "text-decoration-none text-info navbar-link ms-5" : "text-decoration-none navbar-link ms-5"
                        }}
                    >
                        5 day Forcast
                    </NavLink>

                    <NavLink
                        to={'/temp_map'}
                        className={({ isActive }) => {
                            return isActive ? "text-decoration-none text-info navbar-link ms-5" : "text-decoration-none navbar-link ms-5"
                        }}
                    >
                        Temperature Map
                    </NavLink>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}