import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';





interface FormProps {
  email: string;
  password: string;
  recados?: string []
}
 
const Login: React.FC = () => {
  const [form, setForm] = useState<FormProps>({email:'', password:''});

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }


  return (
    <>
    <div>
      <Typography variant='h4' textAlign={'center'}>Login</Typography>
      <br/><br/>
      <form>
          <TextField fullWidth placeholder='e-mail' type="text" value={form.email} />
        <br/><br/>
          <TextField fullWidth placeholder='password' type="password" value={form.password} />
        <br/><br/>
        <Link to = "/recados" style={{textDecoration:'none'}}>
          <Button variant='contained' fullWidth type="submit">Entrar</Button>
        </Link>
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
