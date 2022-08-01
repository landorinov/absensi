import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../navbar/header';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const FullLayout = () => {
    const { isAuthenticated } = useSelector(state => state.global);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) navigate('/auths/login')
    }, [isAuthenticated]);

    return (
        <main className='pb-5'>
            <Header />
            <Outlet />
        </main>
    );
};

export default FullLayout;
