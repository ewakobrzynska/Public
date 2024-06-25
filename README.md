## System Rezerwacji Sal

### Opis projektu

Aplikacja obsługująca proces rezerwacji sal. Składa się z dwóch części: części klienta oraz części serwerowej. Aby korzystać z aplikacji, należy uruchomić zarówno klienta, jak i serwer. Serwer służy do pobierania danych dotyczących rezerwacji sal z systemu USOS. Aplikacja pozwala użytkownikom na przeglądanie dostępnych sal, zgłaszanie problemów, rezerwację sal na konkretne daty i godziny oraz śledzenie historii rezerwacji. Administratorzy mają dodatkowe możliwości zarządzania rezerwacjami i dodawania opisów do sal.

### Funkcjonalności

### Klient

- Wybór konkretnej sali: Użytkownik może wybrać dowolną salę.
- Zgłoszenie problemu: Użytkownik może zgłosić problem dotyczący konkretnej sali.
- Kalendarz rezerwacji: Użytkownik może przeglądać kalendarz z aktualnymi rezerwacjami.
- Dokonanie rezerwacji: Użytkownik może zarezerwować salę na konkretną datę i godzinę.
- Powiadomienia: Po dokonaniu rezerwacji oraz potwierdzeniu przez administratora, użytkownik otrzymuje potwierdzenie na adres e-mail.

### Administrator

- Logowanie: Dostęp do sekcji administratora wymaga logowania.
- Pobieranie danych z USOS: Administrator może pobrać dane rezerwacji z systemu USOS do konkretnej daty.
- Dodawanie opisów do sal: Administrator może dodać opisy do sal.
- Historia rezerwacji: Administrator może przeglądać historię rezerwacji.
- Zarządzanie rezerwacjami: Administrator może akceptować lub odrzucać rezerwacje.

### Technologie

- Firebase: Baza danych używana do przechowywania informacji o rezerwacjach.
- EmailJS: Usługa do wysyłania e-maili z potwierdzeniami rezerwacji do klientów i administratorów.

### Instalacja

### Wymagania wstępne

- Node.js
- NPM

### Testowanie

Dane logowania do panelu administratora

- email : test@gmail.com
- hasło : testtest

Dane logowania do emailjs

- email : guineapigofallah@gmail.com
- hasło : admin

Aby przetestować działanie aplikacji, w sekcji 'email templates', w polu 'to email', należy podać e-mail konta administratora.

## Użycie

### Uruchomienie aplikacji

Po pobraniu repozytorium użyj poniższych komend :

npm install
npm run serve

Upewnij się, że serwer i klient są uruchomieni.

Logowanie jako Administrator

Przejdź do sekcji administratora i zaloguj się przy użyciu danych administratora.
Pobierz dane z USOS do konkretnej daty.
Dodaj opisy do sal i zarządzaj rezerwacjami.
Zaloguj się do emailjs w celu skonfigurowania szablonu emaila, wprowadzając swój email w polu 'to email'.

Użytkownik :
Przeglądaj dostępne sale i kalendarz rezerwacji.
Wybierz salę, zgłoś ewentualne problemy i dokonaj rezerwacji.
Oczekuj na potwierdzenie rezerwacji e-mailem.
