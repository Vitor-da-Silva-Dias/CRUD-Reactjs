import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from '../types/User';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== passwordConfirm) {
      alert(`Passwords don't match`);
      return;
    }
  
    const newUser: User = {
      name,
      email,
      password,
      errands: [],
    };
  
    try {
      const response = await axios.post('https://api-crud-users-errands.onrender.com/users', newUser);
  
      const { ok, message, errors } = response.data;
  
      if (ok) {
        alert(message);
        navigate('/');
      } else {
        if (errors && errors.length > 0) {
          const errorMessages = errors.join('\n');
          alert(errorMessages);
        } else {
          alert(message);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.log(error);
        alert('There was an error creating the account');
      }
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
          label="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
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
