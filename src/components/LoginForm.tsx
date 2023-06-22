import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/users/login', {
        email,
        password,
      });

      const { ok, message, data } = response.data;


      if (ok) {
        alert(message);

        sessionStorage.setItem('logged', JSON.stringify(data));

        navigate('/recados');
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
      alert('Ocorreu um erro ao fazer login.');
    }
  };

  return (
    <>
      <div>
        <Typography variant="h4" textAlign="center">
          Login
        </Typography>
        <br />
        <br />
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" fullWidth type="submit">
            Entrar
          </Button>
          <br />
          <br />
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="success" fullWidth>
              Criar conta
            </Button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
