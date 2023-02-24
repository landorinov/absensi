import {
    Navbar,
    Container,
    Offcanvas,
    Nav,
} from 'react-bootstrap';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Button
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import user from '../../assets/images/users/user5.jpg';
import { initiate } from '../../config/store/global/actions';
import { useState } from 'react';

function Header() {
    const { isExpanded } = useSelector(state => state.global);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('accessToken');
        dispatch(initiate());
        navigate('/auths/login')
    }

    return (
        <Navbar bg="light" expand={isExpanded} className="pb-3">
            <Container>
                <Navbar.Toggle onClick={() => setOpenSideBar(true)}/>
                {
                        openSideBar ? 
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${isExpanded}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${isExpanded}`}
                    placement="start"
                >
                        <Offcanvas.Header closeButton={() => setOpenSideBar(false)}>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${isExpanded}`}>
                                Absensi
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 py-3" style={{ cursor: "pointer" }} onClick={() => {setOpenSideBar(false); navigate('/') }}>
                                Home
                            </Nav>
                            <Nav className="justify-content-end flex-grow-1 pe-3 py-3" style={{ cursor: "pointer" }} onClick={() => {setOpenSideBar(false); navigate('/users/history') }}>
                                Absensi History
                            </Nav>
                            <Nav className="justify-content-end flex-grow-1 pe-3 py-3" style={{ cursor: "pointer" }} onClick={() => {setOpenSideBar(false); navigate('/absensi/home') }}>
                                Absensi History (Table)
                            </Nav>
                        </Offcanvas.Body>
                        </Navbar.Offcanvas> : null
                    }
                <UncontrolledDropdown>
                    <DropdownToggle color='outline-light' >
                        <img src={user} alt="profile" className="rounded-circle" width="50" onClick={() => setOpenProfile(true)} />
                    </DropdownToggle>{
                        openProfile ? <DropdownMenu>
                        <div className="p-2 px-3" style={{ cursor: 'pointer' }} onClick={() => { setOpenProfile(false); navigate('/users/detail');}}>
                            Detail
                        </div>
                        <div className="p-2 px-3" style={{ cursor: 'pointer' }} onClick={() => { setOpenProfile(false); logout();}}>
                            Logout
                        </div>
                    </DropdownMenu> : null
                    }
                </UncontrolledDropdown>
            </Container>
        </Navbar>
    )
}

export default Header;