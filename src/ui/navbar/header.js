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

function Header() {
    const { isExpanded } = useSelector(state => state.global);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('accessToken');
        dispatch(initiate());
        navigate('/auths/login')
    }

    return (
        <Navbar bg="light" expand={isExpanded} className="mb-3">
            <Container>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${isExpanded}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${isExpanded}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${isExpanded}`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${isExpanded}`}>
                            Absensi
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3 py-3" style={{ cursor: "pointer" }} onClick={() => { navigate('/') }}>
                            Home
                        </Nav>
                        <Nav className="justify-content-end flex-grow-1 pe-3" style={{ cursor: "pointer" }} onClick={() => { navigate('/users/history') }}>
                            Absensi History
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <UncontrolledDropdown>
                    <DropdownToggle color='outline-light' >
                        <img src={user} alt="profile" className="rounded-circle" width="50" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <div className="p-2 px-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/users/detail')}>
                            Detail
                        </div>
                        <div className="p-2 px-3" style={{ cursor: 'pointer' }} onClick={() => logout()}>
                            Logout
                        </div>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Container>
        </Navbar>
    )
}

export default Header;