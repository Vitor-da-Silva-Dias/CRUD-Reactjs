import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Lógica de autenticação aqui
  };

  return (
    <div>
      <Typography variant='h4' textAlign={'center'}>Login</Typography>
      <br/><br/>
      <form onSubmit={handleSubmit}>
          <TextField placeholder='e-mail' type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br/><br/>
          <TextField placeholder='password' type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br/><br/>
        <Button variant='contained' fullWidth type="submit">Login</Button>
        <br/><br/>
        <Button variant='contained' color='success' fullWidth type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Login;
