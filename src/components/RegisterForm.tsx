import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  email: string;
  password: string;
  errands: any[];
}

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const allUsers: UserProps[] = JSON.parse(localStorage.getItem('allUsers') ?? '[]');

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length < 6) {
      alert('Preencha o campo com um e-mail válido.');
      return;
    }

    const checkUser = allUsers.find((user) => user.email === email);
    if (checkUser) {
      alert('Email já cadastrado');
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

    const newUser: User = {
      email,
      password,
      errands: [],
    };

    allUsers.push(newUser);

    alert('Conta criada com sucesso.');

    saveAccount(allUsers);

    navigate ('/');
  };

  const saveAccount = (users: User[]) => {
    localStorage.setItem('allUsers', JSON.stringify(users));
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirmar senha:</label>
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
        <button type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterForm;
