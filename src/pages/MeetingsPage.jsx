import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import MeetingList from '../components/MeetingList';
import MeetingCalendar from '../components/MeetingCalendar';
import MeetingForm from '../components/MeetingForm';

export default function MeetingsPage() {
  const { currentUser, logout, meetings, roles, meetingStatus } = useContext(AppContext);

  const [tab, setTab] = useState(0);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Stany filtrowania i sortowania - z wartościami początkowymi (unikamy undefined)
  const [filterDate, setFilterDate] = useState('');
  const [filterParticipant, setFilterParticipant] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('startTime'); // 'startTime' lub 'createdAt'

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  // Filtrowanie i sortowanie spotkań
  const filteredAndSortedMeetings = useMemo(() => {
    let filtered = meetings;

    if (filterDate) {
      filtered = filtered.filter(m => m.date === filterDate);
    }

    if (filterParticipant.trim()) {
      const participantLower = filterParticipant.toLowerCase();
      filtered = filtered.filter(m =>
        m.participants.some(p => p.toLowerCase().includes(participantLower))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => m.status === filterStatus);
    }

    // Sortowanie
    return filtered.slice().sort((a, b) => {
  if (sortBy === 'startTime') {
    // Jeśli format np. "HH:mm", to porównaj stringi
    return a.startTime.localeCompare(b.startTime);
  } else if (sortBy === 'createdAt') {
    return new Date(a.createdAt) - new Date(b.createdAt);
  }
  return 0;
});

  }, [meetings, filterDate, filterParticipant, filterStatus, sortBy]);

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">
          Witaj, {currentUser?.username} ({currentUser?.role})
        </Typography>
        <Button variant="outlined" onClick={logout}>
          Wyloguj się
        </Button>
      </Box>

      <Button variant="contained" onClick={() => { setEditingMeeting(null); setShowForm(true); }}>
        Dodaj rezerwację
      </Button>

      {showForm && (
        <MeetingForm
          meeting={editingMeeting}
          onClose={() => setShowForm(false)}
          onSaved={() => setShowForm(false)}
        />
      )}

      {/* Filtry i sortowanie */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', my: 2 }}>
        <TextField
          label="Filtruj po dacie"
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        <TextField
          label="Filtruj po uczestniku"
          placeholder="Email lub nazwa"
          value={filterParticipant}
          onChange={e => setFilterParticipant(e.target.value)}
          size="small"
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="filter-status-label">Status</InputLabel>
          <Select
            labelId="filter-status-label"
            value={filterStatus}
            label="Status"
            onChange={e => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">Wszystkie</MenuItem>
            <MenuItem value={meetingStatus.SCHEDULED}>Aktywne</MenuItem>
            <MenuItem value={meetingStatus.CANCELED}>Odwołane</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-by-label">Sortuj według</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sortuj według"
            onChange={e => setSortBy(e.target.value)}
          >
            <MenuItem value="startTime">Godzina rozpoczęcia</MenuItem>
            <MenuItem value="createdAt">Czas utworzenia</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 2 }}>
        <Tab label="Lista" />
        <Tab label="Kalendarz" />
      </Tabs>

      {tab === 0 && (
        <MeetingList
          meetings={filteredAndSortedMeetings}
          onEdit={m => {
            setEditingMeeting(m);
            setShowForm(true);
          }}
        />
      )}
      {tab === 1 && <MeetingCalendar />}
    </Container>
  );
}
