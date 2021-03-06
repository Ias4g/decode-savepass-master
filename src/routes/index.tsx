
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { userLogged } = useContext(AuthContext)

  return userLogged ? <AppRoutes /> : <AuthRoutes />
}  