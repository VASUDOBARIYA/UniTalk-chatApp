# UniTalk - Real-time Chat Application

A modern, full-stack real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io. UniTalk provides seamless messaging with features like real-time communication, image sharing, user authentication, and online status indicators.

## 🚀 Features

### Core Features
- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure login/signup with JWT tokens
- **Image Sharing**: Send and receive images in conversations
- **Online Status**: See who's currently online
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Message History**: Persistent message storage in MongoDB
- **Profile Management**: Update user profile and bio
- **Unread Message Count**: Track unread messages per conversation

### Technical Features
- **Modern UI**: Built with React 19 and Tailwind CSS
- **Real-time Updates**: Socket.io for live communication
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Cloud Storage**: Cloudinary integration for image uploads
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API for global state
- **Toast Notifications**: User-friendly feedback with react-hot-toast

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
UniTalk-chatApp/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── component/          # React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── MediaContainer.jsx
│   │   │   └── SideBar.jsx
│   │   ├── Context/            # React Context providers
│   │   │   ├── AppContext.jsx
│   │   │   └── messageContext.jsx
│   │   ├── assets/             # Static assets
│   │   ├── App.jsx             # Main App component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Public assets
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Node.js application
│   ├── config/                 # Configuration files
│   │   ├── db.js              # Database connection
│   │   ├── cloudinary.js      # Cloudinary config
│   │   └── util.js            # Utility functions
│   ├── controller/             # Route controllers
│   │   ├── user.controller.js
│   │   └── message.controller.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.middleware.js
│   ├── models/                 # Database models
│   │   ├── user.model.js
│   │   └── message.model.js
│   ├── routes/                 # API routes
│   │   ├── user.router.js
│   │   └── message.router.js
│   ├── server.js              # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UniTalk-chatApp
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGO_URL=mongodb://localhost:27017
   # or for MongoDB Atlas:
   # MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net
   
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

   Create a `.env` file in the client directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run server
   ```
   The server will start on `http://localhost:5000`

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to access the application

## 📱 Usage

### User Registration/Login
1. Open the application in your browser
2. Click on "Sign Up" to create a new account or "Login" for existing users
3. Fill in your details (name, email, bio, password)
4. Upload a profile picture (optional)

### Starting a Conversation
1. After logging in, you'll see a list of all registered users
2. Click on any user to start a conversation
3. Online users will have a green dot indicator

### Sending Messages
1. Type your message in the input field at the bottom
2. Press Enter or click the send button
3. To send images, click the image icon and select a file
4. Messages are delivered in real-time

### Managing Profile
1. Click on your profile picture or name
2. Update your name, bio, or profile picture
3. Changes are saved automatically

## 🔧 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/check` - Verify authentication
- `PUT /api/user/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users and unread counts
- `GET /api/messages/:userId` - Get messages with specific user
- `POST /api/messages/send/:userId` - Send message to user
- `PUT /api/messages/send/:messageId` - Mark message as seen

### Status
- `GET /api/status` - Server health check

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **File Type Validation**: Only image files allowed for uploads

## 🌐 Deployment

### Vercel Deployment
Both client and server are configured for Vercel deployment:

1. **Deploy Server**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy from the `server` directory

2. **Deploy Client**
   - Deploy from the `client` directory
   - Update `VITE_BACKEND_URL` to your deployed server URL

### Environment Variables for Production
```env
MONGO_URL=your_production_mongodb_url
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
```

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in `client/src/index.css`
- Component styles in individual component files
- Background images in the `public` directory

### Features
- Add new message types (files, voice messages)
- Implement group chats
- Add message reactions
- Implement message search
- Add user presence (typing indicators)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGO_URL` in environment variables

2. **Socket Connection Issues**
   - Verify server is running on the correct port
   - Check CORS configuration

3. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits

4. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT secret configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Vasu Dobariya - [YourGitHub](https://github.com/VASUDOBARIYA)

## 🙏 Acknowledgments

- React team for the amazing framework
- Socket.io for real-time communication
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database
- Cloudinary for image storage solutions

## 📞 Support

If you have any questions or run into issues, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Chatting! 💬**
