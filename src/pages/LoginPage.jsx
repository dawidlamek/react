import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

export default function LoginPage() {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/meetings');
    } else {
      setError('Niepoprawny email lub hasło');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Logowanie</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextField
          fullWidth
          label="Hasło"
          margin="normal"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Zaloguj się
        </Button>
      </form>
      <Typography sx={{ mt: 2 }}>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </Typography>
    </Container>
  );
}
