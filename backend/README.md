# Backend Services for Legacy Dashboard

This folder contains the backend services for the Legacy Dashboard application, including Firebase authentication and Firestore database integration.

## Firebase Setup

To use the Firebase services, you need to:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google Sign-In)
3. Create a Firestore database
4. Get your Firebase configuration from Project Settings > General > Your apps > Firebase SDK snippet > Config
5. Update the `firebase.js` file with your Firebase configuration

## Authentication Features

- Email validation for Minerva University emails (@uni.minerva.edu)
- Role-based access control (admin vs. user)
- Google Sign-In with Minerva email validation
- Protected routes based on user roles

## Admin Access

To grant admin access to a user, add their email to the `ADMIN_EMAILS` array in `authService.js`. By default, `admin@uni.minerva.edu` is set as an admin email.

## Installation

```bash
# Install dependencies
npm install
```

## Integration with Frontend

The backend services are imported directly into the frontend React components. Make sure the paths are correct when importing from the backend folder. 