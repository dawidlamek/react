import React, { createContext, useState, useEffect } from 'react';
import { roles, meetingStatus } from '../models';

export const AppContext = createContext();

const initialUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin', role: roles.ADMIN, createdAt: new Date() },
  { id: 2, username: 'user1', email: 'user1@example.com', password: 'user1', role: roles.USER, createdAt: new Date() },
];

const initialMeetings = [
  {
    id: 1,
    title: 'Demo meeting',
    description: 'Test meeting',
    date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    startTime: '10:00',
    endTime: '11:00',
    participants: ['user1@example.com'],
    createdBy: 'user1',
    status: meetingStatus.SCHEDULED,
  },
];

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [currentUser, setCurrentUser] = useState(null);

  // Prosty login – bez bezpieczeństwa (tylko demo)
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const register = (username, email, password) => {
    if (users.find(u => u.email === email)) return false; // email już istnieje
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
      role: roles.USER,
      createdAt: new Date(),
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const addMeeting = (meeting) => {
    meeting.id = meetings.length + 1;
    meeting.createdAt = new Date().toISOString();
    setMeetings([...meetings, meeting]);
  };

  const editMeeting = (updatedMeeting) => {
    setMeetings(meetings.map(m => (m.id === updatedMeeting.id ? updatedMeeting : m)));
  };

  const cancelMeeting = (id) => {
    setMeetings(meetings.map(m => (m.id === id ? { ...m, status: meetingStatus.CANCELED } : m)));
  };

  return (
    <AppContext.Provider
      value={{
        users,
        meetings,
        currentUser,
        login,
        logout,
        register,
        addMeeting,
        editMeeting,
        cancelMeeting,
        roles,
        meetingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
