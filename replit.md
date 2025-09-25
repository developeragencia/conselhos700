# Sensitivos na Web - Web App Architecture

## Overview

Sensitivos na Web is a web application designed to connect users with spiritual consultants for various services, including tarot readings, astrology consultations, and psychic readings. The project aims to provide a modern, intuitive platform for booking and managing these services, fostering a thriving community around spiritual guidance. Key capabilities include user and consultant management, service booking, content management, and e-commerce functionality for spiritual products.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application employs a full-stack architecture consisting of a React frontend and a Node.js Express backend, with PostgreSQL (via Drizzle ORM) for data persistence.

### Frontend Architecture

The frontend is a React 18+ single-page application built with a component-based architecture. It utilizes TanStack Query for data fetching, Tailwind CSS and shadcn/ui for styling, Wouter for routing, Zustand for state management (especially for the shopping cart), and React Hook Form for form handling. The design emphasizes responsiveness, accessibility, and a consistent theme featuring a purple-blue-gold color scheme.

### Backend Architecture

The backend is a Node.js Express application that serves the React frontend in production and exposes RESTful API endpoints under the `/api` prefix. It handles authentication, data validation, and business logic, connecting to the PostgreSQL database via Drizzle ORM. The server is modular, ensuring separation of concerns between routes, data access, and business logic.

### Database Architecture

PostgreSQL with Drizzle ORM manages all application data, including user accounts, consultant profiles, service offerings, bookings, product inventory, blog content, and testimonials. The schema is defined to include relations between entities, supporting comprehensive user, consultant, and content management.

### Key Features

-   **User Management**: Registration, authentication, user profiles with purchase history, consultant profiles with specialties, and role-based access (users, consultants, administrators).
-   **Service Booking**: Browsing consultants, viewing profiles and availability, booking and paying for consultations, and a rating/review system.
-   **Content Management**: Blog for articles, testimonials, and promotional content.
-   **E-commerce**: Product catalog, shopping cart, checkout process, and payment integration.
-   **Interactive Tools**: Free tarot card reading tool and newsletter subscription.

### Data Flow

The application manages distinct data flows for user authentication, consultation booking, e-commerce transactions, and content consumption. This includes user login/registration, session management, booking workflows from selection to payment and notification, shopping cart management, order processing, and dynamic content fetching.

## External Dependencies

### Frontend Libraries

-   React & React DOM
-   TanStack Query
-   Wouter
-   Radix UI
-   Tailwind CSS
-   Zustand
-   React Hook Form & Zod
-   date-fns
-   clsx & class-variance-authority

### Backend Libraries

-   Express
-   Drizzle ORM
-   Neon Database SDK
-   Vite
-   TypeScript
-   Zod

### Third-party Integrations

-   Stripe (for payment processing)