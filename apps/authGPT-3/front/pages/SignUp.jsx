/*
Para crear la página de registro, crea un archivo llamado Signup.js 
en la carpeta pages. Dentro de ese archivo, 
escribe el siguiente código:
*/

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/signup', { name, email, password });
      if (res.status === 201) {
        history.push('/dashboard');
      } else {
        // handle signup error
      }
    } catch (err) {
      // handle signup error
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name:</Label>
      <Input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button type="submit">Signup</Button>
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

export default Signup;
