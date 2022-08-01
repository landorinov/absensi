import React, { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Themeroutes from './config/routes';
import Loader from './ui/loader/loader';
import './App.css';
import { useDispatch } from 'react-redux';
import { initiate } from './config/store/global/actions';

function App() {
  const routing = useRoutes(Themeroutes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiate())
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <div>
        {routing}
      </div>
    </Suspense>
  );
}

export default App;
