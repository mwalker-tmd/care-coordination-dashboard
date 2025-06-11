# Care Coordination Dashboard

An open-source React dashboard for healthcare appointment management, built with modern state management patterns and layered testing best practices.

## 🚀 Features

### Current MVP Features
- **Calendar + Timeline View**: Interactive calendar interface for managing appointments
- **Patient Profile Panel**: Comprehensive view of patient information and history
- **Real-time Care Updates**: Live updates for care coordination activities

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- MSW (Mock Service Worker) for API mocking
- Zustand for modern state management
- Comprehensive testing suite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/mwalker-tmd/care-coordination-dashboard.git
   cd care-coordination-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3001 # Replace with your backend API server's URL
   VITE_ENABLE_MOCK_API=true  # Toggle for MSW API mocking
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 🧪 Testing

Run the test suite with:
```bash
npm test
# or
yarn test
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run format` - Format code

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries

## 📫 Contact

For questions or support, please open an issue in the GitHub repository. 