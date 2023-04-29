import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';



interface LoginProps {
  email: string;
  password: string;
}
 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const allUsers: LoginProps[] = JSON.parse(localStorage.getItem('allUsers') ?? '[]');

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const checkUser = allUsers.find(
      (user) =>
        user.email === email && user.password === password
    );


    if (!checkUser) {
      alert('Email ou senha incorreta');
      return;
    }

    alert('Login realizado com sucesso.');

    sessionStorage.setItem('logged', JSON.stringify(checkUser));

    navigate ('/recados');
  }


  return (
    <>
    <div>
      <Typography variant='h4' textAlign={'center'}>Login</Typography>
      <br/><br/>
      <form onSubmit={handleLogin}>
          <TextField fullWidth label='e-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br/><br/>
          <TextField fullWidth label='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/><br/>
          <Button variant='contained' fullWidth type="submit">Entrar</Button>
        <br/><br/>
        <Link to = "/signup" style={{textDecoration:'none'}}>
        <Button variant='contained' color='success' fullWidth>Criar conta</Button>
        </Link>
      </form>
    </div>
  </>
  );
};

export default Login;
