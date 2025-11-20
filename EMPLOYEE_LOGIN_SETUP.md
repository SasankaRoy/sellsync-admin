# Employee Login Implementation

## Overview

Updated the Login.jsx to support employee authentication with the ability to login using either email or User ID, and automatic routing to the seller dashboard.

## Changes Made

### 1. **Login.jsx - State Management**

Added `loginType` state to distinguish between admin and employee login:

```javascript
const [loginType, setLoginType] = useState("admin"); // "admin" or "employee"
const [loginDetails, setLogoinDetails] = useState({
  identifier: "", // email or userId (instead of separate email field)
  password: "",
});
```

### 2. **Login Handler Logic**

Enhanced `loginHandler` to support employee login:

- **Admin Login**: Uses email + password at endpoint `/api/v1/auth/login`
- **Employee Login**: Uses either email or User ID + password at endpoint `/api/v1/auth/staff-login`
  - Automatically detects if identifier is email (contains "@") or User ID
  - Routes to `/seller/dashboard` instead of admin dashboard

```javascript
if (loginType === "employee") {
  if (loginDetails.identifier.includes("@")) {
    loginPayload.email = loginDetails.identifier;
  } else {
    loginPayload.log_userId = loginDetails.identifier;
  }
  loginEndpoint = "/api/v1/auth/staff-login";
} else {
  loginPayload.email = loginDetails.identifier;
  loginEndpoint = "/api/v1/auth/login";
}
```

### 3. **UI Updates**

Added toggle buttons for login type selection:

- **Admin Login** button
- **Employee Login** button
- Dynamically updates placeholder and label text based on selected login type
- Input field now accepts both email and User ID for employee login

### 4. **Token Storage**

Tokens are stored in cookies the same way for both login types:

- `authToken`: JWT authentication token
- `u_id`: User ID (from response)
- `u_type`: User type (admin or staff)

### 5. **Routing**

After successful login:

- **Admin users** → routes to `/` (admin dashboard)
- **Employee/Staff users** → routes to `/seller/dashboard`

## How Employee Creation Works (from Employee.jsx)

When an admin adds an employee:

1. Admin fills in the form with:

   - Full name
   - Email
   - **User ID** (`log_userId`) - This is what employees use to login instead of email
   - Password
   - Role (staff)
   - Staff Position
   - Date of Birth
   - Address (street, city, state, zip)
   - Status (active/inactive)

2. Data is sent to: `POST /api/v1/user/employee-add`

3. Employee can now login with either:
   - Their **User ID** + Password, OR
   - Their **Email** + Password

## API Endpoints

### Employee Creation

```
POST /api/v1/user/employee-add
```

Payload includes: full_name, email, log_userId, password, role, staff_position, phone, date_of_birth, address, status

### Employee Login

```
POST /api/v1/auth/staff-login
```

Payload:

- `log_userId` (if using User ID) or `email` (if using email)
- `password`

Response includes:

- `token`: JWT token
- `user_id`: User ID
- `user_type`: "staff"

### Admin Login

```
POST /api/v1/auth/login
```

Payload:

- `email`
- `password`

## Backend Implementation Required

You'll need to implement the staff login endpoint on your backend:

```javascript
POST /api/v1/auth/staff-login
- Accept either log_userId or email + password
- Verify employee exists and is active
- Return token, user_id, and user_type: "staff"
```

## RouteGuard Flow

The existing RouteGuard will work seamlessly:

1. Gets token from cookie
2. Fetches user details using `GET /api/v1/user/details/{userId}/{userType}`
3. Stores user info in Redux
4. Routes based on user type to appropriate dashboard

## Testing Checklist

- [ ] Add an employee with User ID "emp123" and Password "test123"
- [ ] Test login with User ID (emp123) + password
- [ ] Test login with email + password
- [ ] Verify staff is routed to `/seller/dashboard`
- [ ] Verify token is stored in cookies
- [ ] Verify RouteGuard properly validates the staff session
