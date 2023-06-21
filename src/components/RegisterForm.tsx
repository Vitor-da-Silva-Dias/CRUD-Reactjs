import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from '../types/User';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length < 6) {
      alert('Preencha o campo com um e-mail válido.');
      return;
    }

    if (password.length < 5) {
      alert('Crie uma senha com no mínimo 5 dígitos.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('As senhas digitadas são diferentes.');
      return;
    }

    try {
      const newUser: User = {
        email,
        password,
        errands: [],
      };

      const response = await axios.post(`http://localhost:3333/users`, newUser);

      if (response.status === 201) {
        alert('Conta criada com sucesso.');
        navigate('/');
      } else {
        alert('Falha ao criar a conta. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar a conta:', error);
      alert('Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <Typography variant="h4" textAlign={'center'}>
        Sign Up
      </Typography>
      <br />
      <br />
      <form onSubmit={handleSignUp}>
        <TextField
          fullWidth
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <TextField
          fullWidth
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <TextField
          fullWidth
          label="confirm password"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="success" fullWidth>
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Register;
