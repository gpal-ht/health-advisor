# Health Advisor App

A comprehensive health and fitness tracking application built with Expo and React Native.

## Features

- **Personalized Workout Plans**: Track your exercises, sets, and reps
- **Meal Planning**: Access healthy meal suggestions and nutritional information
- **Progress Tracking**: Monitor your weight loss and fitness journey
- **User Profiles**: Manage your personal fitness goals and achievements

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/health-advisor.git
cd health-advisor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open in your default browser at `http://localhost:8081`.

### Testing on Mobile Devices

1. Install the Expo Go app on your mobile device
2. Scan the QR code displayed in the terminal or browser
3. The app will load on your device through Expo Go

## Project Structure

```
health-advisor/
├── app/                    # Application routes and screens
│   ├── (tabs)/            # Tab-based navigation
│   └── _layout.tsx        # Root layout configuration
├── assets/                # Static assets
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript type definitions
```

## Supported Use Cases

### Workout Tracking
- View and follow structured workout plans
- Track sets and repetitions
- Monitor exercise progress
- Access exercise instructions and form guides

### Meal Planning
- Browse healthy meal suggestions
- View nutritional information
- Track daily calorie intake
- Access recipe instructions

### Profile Management
- Set and update fitness goals
- Track weight loss progress
- View workout history
- Manage user preferences

## Deployment

### Web Deployment

1. Build the web version:
```bash
npm run build:web
```

2. Deploy to Netlify:
- Connect your GitHub repository to Netlify
- Configure build settings:
  - Build command: `npm run build:web`
  - Publish directory: `dist`

### Mobile Deployment

For iOS and Android deployment, use Expo Application Services (EAS):

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas init
```

3. Build for stores:
```bash
eas build --platform ios
eas build --platform android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/gpal-ht/health-advisor)