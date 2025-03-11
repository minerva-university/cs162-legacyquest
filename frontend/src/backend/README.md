# Backend Services for Legacy Dashboard

This folder contains the backend services for the Legacy Dashboard application, including Firebase authentication and Firestore database integration.

## Authentication Features

- Email validation for Minerva University emails (@uni.minerva.edu)
- Role-based access control (admin vs. user)
- Google Sign-In with Minerva email validation
- Protected routes based on user roles

## Admin Access

To grant admin access to a user, add their email to the `ADMIN_EMAILS` array in `authService.js`. By default, `admin@uni.minerva.edu` is set as an admin email.

## Integration with Frontend

The backend services are imported directly into the frontend React components. 