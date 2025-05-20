import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

export default function RegisterPage() {
  const { register } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(username, email, password)) {
      navigate('/meetings');
    } else {
      setError('Użytkownik z tym emailem już istnieje');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Rejestracja</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nazwa użytkownika"
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
          Zarejestruj się
        </Button>
      </form>
      <Typography sx={{ mt: 2 }}>
        Masz już konto? <Link to="/login">Zaloguj się</Link>
      </Typography>
    </Container>
  );
}
