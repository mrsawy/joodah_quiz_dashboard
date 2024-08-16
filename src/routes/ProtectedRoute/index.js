import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { checkLogged } from '../../store/auth/authSlice';

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { checkIsDone, isError, isLoading, isSuccess, isLogged } = useSelector(
    (state) => state.auth
  );
  useLayoutEffect(() => {
    dispatch(checkLogged());
  }, []);
  if (isLoading || !checkIsDone) return <Spinner className="h-full" />;
  if (isError || !isLogged) {
    return <Navigate to="/dashboard/login" />;
  }
  if (isSuccess && isLogged) {
    return children;
  }
}

export default ProtectedRoute;
