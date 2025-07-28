src/
├── assets/                # Images, logos, icons
├── components/            # Reusable components (Navbar, Input, Button, etc.)
│
├── features/              # Feature-based folders (AddPassword, Dashboard, Auth, etc.)
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── authService.js   # API calls for auth
│   │
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   └── PasswordCard.jsx
│   │
│   ├── password/
│   │   ├── AddPassword.jsx
│   │   ├── EditPassword.jsx
│   │   └── passwordService.js  # CRUD API calls
│
├── hooks/                 # Custom React hooks (useAuth, useToggle etc.)
├── context/               # AuthContext for user & token
├── utils/                 # Encryption/decryption helpers, JWT utils
├── routes/                # React Router setup and private route logic
├── App.jsx                # Root app with routes
└── main.jsx               # Vite entry point
