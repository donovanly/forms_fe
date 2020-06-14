import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/root';

interface IProps {
    children: React.ReactNode,
    path: string,
    type: string,
}

export default function AuthRoute(props: IProps) {
  const { type } = props;
  const isAuthenticated = useSelector((state: RootState) => state.authReducer.auth.access_token);
  if (type === 'guest' && isAuthenticated) return <Redirect to="/c/forms" />;
  if (type === 'private' && !isAuthenticated) return <Redirect to="/" />;

  return <Route {...props} />;
};
