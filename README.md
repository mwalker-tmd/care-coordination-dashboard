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
- Jest for testing and mocking
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
      **Tailwind CSS Notes:**
    >
    > This project uses **Tailwind CSS 4.x (pure ESM)** with PostCSS integration.
    > - Tailwind scaffolding has been pre-wired with:
    > - `tailwind.config.js`
    > - `postcss.config.js`
    > - `@tailwindcss/postcss` adapter
    >
    > ✅ No additional Tailwind initialization steps are required.
    >
    > _**Note:** If you attempt to run `npx tailwindcss init` and receive ESM/npx errors, this is due to Tailwind 4.x + npm 11 ESM incompatibility. This repo is already fully configured for you._

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3001 # Replace with your backend API server's URL
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

To run tests with coverage report:
```bash
npm run test:coverage
# or
yarn test:coverage
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run linting
- `npm run format` - Format code

## Setting Up the Project for Deployment via Vercel
> _NOTE: This section is informational only. It only needs to be completed when setting up or changing the CD pipeline._ 

### Creating a New Project
1. Log in to your Vercel account.
2. Click on **New Project**.
3. Import your GitHub repository.
4. Configure the project settings:
   - **Framework Preset:** Select the appropriate framework (e.g., Vite).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Environment Variables
> _NOTE: This environment variable is not required at this time because the backend API responses are mocked in the frontend code for demonstration purposes. It will be required once the backend API is built and running._
- Add the following environment variables in your Vercel project settings:
  - `VITE_API_BASE_URL`: The URL of your API.
  - Any other required environment variables.

### Custom Domain
- If you have a custom domain, go to the **Domains** section in your project settings and add it.

### Deployment
- Vercel will automatically deploy your project when changes are pushed to the linked GitHub repository.
- You can also manually deploy from the Vercel dashboard.

### GitHub Environment Variables for CD Pipeline
To enable the GitHub Actions CD pipeline, set up the following secrets in your GitHub repository:
1. Go to your GitHub repository.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel API token.
   - `VERCEL_ORG_ID`: Your Vercel organization ID.
   - `VERCEL_PROJECT_ID`: Your Vercel project ID.

For more detailed instructions, refer to the [Vercel documentation](https://vercel.com/docs).

## Deployment with Vercel

### Prerequisites
- Node.js and npm installed.
- Vercel CLI installed globally:
  ```bash
  npm install -g vercel
  ```

### Deploying the Project
1. Run the following command in the project directory:
   ```bash
   vercel
   ```
2. Follow the prompts to link your Vercel account and select the project.

### Environment Variables
- Set up any required environment variables in your Vercel project settings.

### Additional Configuration
- Refer to the `vercel.json` file for any specific Vercel configuration.

For more information, visit the [Vercel documentation](https://vercel.com/docs). 

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