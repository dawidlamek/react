1. Zainstaluj zależności

npm install

2. Uruchom aplikację

npm run dev

Struktura projektu

bash
Kopiuj
Edytuj
src/
├── components/         # Komponenty UI (MeetingList, MeetingForm, MeetingCalendar itd.)
├── contexts/           # Context API - AppContext
├── pages/              # Strony (MeetingsPage)
├── utils/              # Funkcje pomocnicze
├── App.js              # Główny komponent aplikacji
└── index.js            # Punkt wejścia

Użycie

Po zalogowaniu użytkownik może przeglądać spotkania w formie listy lub kalendarza.

Można filtrować spotkania po dacie, uczestniku i statusie.

Spotkania można sortować według godziny rozpoczęcia lub daty utworzenia.

Kliknięcie na przycisk "Dodaj rezerwację" otwiera formularz tworzenia nowego spotkania.

Użytkownicy z rolą admin lub właściciele spotkania mogą edytować lub anulować spotkania.

Role użytkowników

Admin – pełne uprawnienia do zarządzania wszystkimi spotkaniami.

Użytkownik – może zarządzać tylko swoimi spotkaniami.

Technologie

React

Material-UI (MUI)

Context API (React)

JavaScript (ES6+)

Możliwe rozszerzenia

Backend z REST API do przechowywania i zarządzania danymi spotkań

Autentykacja i autoryzacja z JWT

Powiadomienia e-mailowe

Integracja z kalendarzem Google