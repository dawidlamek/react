import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { List, ListItem, ListItemText, IconButton, Typography, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export default function MeetingList({ meetings, onEdit }) {
  const { currentUser, cancelMeeting, roles } = useContext(AppContext);

  const canEdit = (meeting) => {
    if (currentUser.role === roles.ADMIN) return true;
    if (meeting.createdBy === currentUser.username) return true;
    return false;
  };

  return (
    <List>
      {meetings.map(m => (
        <ListItem
          key={m.id}
          secondaryAction={
            <>
              {m.status === 'scheduled' && canEdit(m) && (
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => onEdit(m)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="cancel" onClick={() => cancelMeeting(m.id)}>
                    <CancelIcon />
                  </IconButton>
                </>
              )}
              {m.status === 'canceled' && <Chip label="Odwołane" color="error" />}
            </>
          }
        >
          <ListItemText
            primary={`${m.title} (${m.date} ${m.startTime}-${m.endTime})`}
            secondary={`Utworzony przez: ${m.createdBy}`}
          />
        </ListItem>
      ))}
      {meetings.length === 0 && <Typography>Brak rezerwacji</Typography>}
    </List>
  );
}
