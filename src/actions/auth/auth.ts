import {tesloApi} from '../../config/api/tesloApi';
import {User} from '../../domain/entities/user';
import type {AuthResponse} from '../../infrastructure/interfaces/auth.responses';

const returnUserToken = (data: AuthResponse) => {
  /* Esto vendria a ser un mapeo */
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };
  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  try {
    const {data} = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const {data} = await tesloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);
  } catch (error) {
    console.log({error});
    return null;
  }
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
) => {
  try {
    const {data} = await tesloApi.post<AuthResponse>('/api/auth/register', {
      email,
      password,
      fullName,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw new Error('Error en el registro');
  }
};
