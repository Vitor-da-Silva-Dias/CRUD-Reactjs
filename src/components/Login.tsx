import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Lógica de autenticação aqui
  };

  return (
    <>
    <div>
      <Typography variant='h4' textAlign={'center'}>Login</Typography>
      <br/><br/>
      <form onSubmit={handleSubmit}>
          <TextField fullWidth placeholder='e-mail' type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br/><br/>
          <TextField fullWidth placeholder='password' type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br/><br/>
        <Button variant='contained' fullWidth type="submit">Entrar</Button>
        <br/><br/>
        <Button variant='contained' color='success' fullWidth onClick={handleOpen}>Criar conta</Button>
      </form>
    </div>
    <div>
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant='h4' textAlign={'center'}>Criar uma nova conta</Typography>
        <br/><br/>
        <TextField fullWidth placeholder='e-mail' type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br/><br/>
        <TextField fullWidth placeholder='password' type="password" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br/><br/>
        <TextField fullWidth placeholder='confirm password' type="password" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br/><br/>
        <Button variant='contained' color='success' fullWidth>Criar conta</Button>
      </Box>
    </Modal>
  </div>
  </>
  );
};

export default Login;
