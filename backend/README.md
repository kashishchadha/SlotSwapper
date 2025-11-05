# SlotSwapper Backend API

Complete REST API for the SlotSwapper application built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with bcrypt password hashing
- **User Management**: Register, login, profile updates
- **Slot Management**: Create, read, update, delete calendar slots
- **Swap Requests**: Create, accept, reject, and cancel swap requests
- **Marketplace**: Browse available slots for swapping
- **Protected Routes**: Middleware-based route protection

## 📦 Installation

```bash
cd backend
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URL=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
PORT=3000
```

## 🏃 Running the Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "avatar": "👤",
    "notificationsEnabled": true
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Updated",
  "email": "john.new@example.com",
  "notificationsEnabled": false,
  "avatar": "😊"
}
```

### Slot Routes (`/api/slots`)

#### Get My Slots
```http
GET /api/slots
Authorization: Bearer <token>
```

#### Get Marketplace Slots
```http
GET /api/slots/marketplace?category=Meeting&date=2025-11-05&search=project
Authorization: Bearer <token>
```

Query Parameters:
- `category`: Filter by category (Meeting, Shift, Class, Event, Other)
- `date`: Filter by specific date
- `search`: Search in title, description, or location

#### Get Single Slot
```http
GET /api/slots/:id
Authorization: Bearer <token>
```

#### Create Slot
```http
POST /api/slots
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Team Meeting",
  "date": "2025-11-10",
  "startTime": "09:00",
  "endTime": "10:00",
  "location": "Conference Room A",
  "category": "Meeting",
  "status": "SWAPPABLE",
  "description": "Weekly team sync"
}
```

#### Update Slot
```http
PUT /api/slots/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Meeting",
  "status": "BUSY"
}
```

#### Delete Slot
```http
DELETE /api/slots/:id
Authorization: Bearer <token>
```

### Swap Request Routes (`/api/swaps`)

#### Get Incoming Requests
```http
GET /api/swaps/incoming
Authorization: Bearer <token>
```

#### Get Outgoing Requests
```http
GET /api/swaps/outgoing
Authorization: Bearer <token>
```

#### Create Swap Request
```http
POST /api/swaps
Authorization: Bearer <token>
Content-Type: application/json

{
  "requesterSlotId": "slot_id_you_want_to_swap",
  "receiverSlotId": "slot_id_you_want_to_get",
  "message": "Would love to swap! Can we trade slots?"
}
```

#### Accept Swap Request
```http
PUT /api/swaps/:id/accept
Authorization: Bearer <token>
```

This will:
- Swap the slot owners
- Update both slots' status to 'BUSY'
- Mark the request as 'accepted'

#### Reject Swap Request
```http
PUT /api/swaps/:id/reject
Authorization: Bearer <token>
```

This will:
- Update requester's slot status back to 'SWAPPABLE'
- Mark the request as 'rejected'

#### Cancel Swap Request
```http
DELETE /api/swaps/:id
Authorization: Bearer <token>
```

## 🗃️ Data Models

### User
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (default: '👤'),
  notificationsEnabled: Boolean (default: true),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Slot
```javascript
{
  user: ObjectId (ref: User, required),
  title: String (required),
  date: Date (required),
  startTime: String (required),
  endTime: String (required),
  location: String,
  category: String (enum: ['Meeting', 'Shift', 'Class', 'Event', 'Other']),
  status: String (enum: ['BUSY', 'SWAPPABLE', 'SWAP_PENDING']),
  description: String,
  timestamps: true
}
```

### SwapRequest
```javascript
{
  requester: ObjectId (ref: User, required),
  receiver: ObjectId (ref: User, required),
  requesterSlot: ObjectId (ref: Slot, required),
  receiverSlot: ObjectId (ref: Slot, required),
  status: String (enum: ['pending', 'accepted', 'rejected', 'cancelled']),
  message: String,
  respondedAt: Date,
  timestamps: true
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned upon successful login/registration and should be stored in `localStorage` on the frontend.

## ⚠️ Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## 🎯 Frontend Integration

The frontend uses Axios with interceptors for API calls. See `client/src/api/axios.js`:

```javascript
import API from '../api/axios';

// Example usage
const { data } = await API.post('/auth/login', { email, password });
const slots = await API.get('/slots/marketplace?category=Meeting');
```

## 📝 Development

- Backend runs on port 3000
- Frontend runs on port 5173 (or 5174 if 5173 is in use)
- MongoDB connection is established on server start
- CORS is configured to allow frontend origin

## 🔗 Connected Frontend

The frontend is fully integrated with:
- **AuthContext**: Manages authentication state
- **Protected Routes**: Redirects unauthorized users
- **API Helper**: Axios instance with token interceptors
- **Toast Notifications**: User feedback for all operations

## 🎨 Testing the API

You can test the API using:
1. Postman/Insomnia
2. Thunder Client (VS Code extension)
3. The integrated frontend application

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5"
}
```

## 🚀 Deployment Ready

The backend is production-ready with:
- Environment variable configuration
- Error handling middleware
- Input validation
- Password hashing
- JWT authentication
- Database indexing for performance

---

**Built with ❤️ for SlotSwapper**
