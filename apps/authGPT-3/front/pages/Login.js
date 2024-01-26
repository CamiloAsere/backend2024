/*
Ahora, crearemos la estructura de carpetas. 
En la carpeta src, crea las siguientes carpetas: 
components, pages, utils y services.

Para crear la página de inicio de sesión, 
crea un archivo llamado Login.js en la carpeta pages. 
Dentro de ese archivo, escribe el siguiente código:

*/
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { email, password });
      if (res.status === 200) {
        history.push('/dashboard');
      } else {
        // handle login error
      }
    } catch (err) {
      // handle login error
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email:</Label>
      <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label htmlFor="password">Password:</Label>
      <Input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </Form>
  );
};

const Form = styled.form`
  /* styles here */
`;

const Label = styled.label`
  /* styles here */
`;

const Input = styled.input`
  /* styles here */
`;

const Button = styled.button`
  /* styles here */
`;

export default Login;
