# Basketball Workout App

This project is a React Native application designed to help users improve their basketball skills through various drills and workouts. The app tracks progress, provides timers, and allows users to save their results.

## Features

- Multiple workout drills with step-by-step instructions
- Timer and countdown functionality
- Progress tracking for time, reps, and weights
- Localization support with translations

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Android Studio or Xcode (for Android or iOS development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bball-workout.git
   cd bball-workout
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment:

   - For iOS:

     ```bash
     cd ios
     pod install
     cd ..
     ```

   - For Android, ensure you have an Android emulator or device set up.

### Running the App

- For iOS:

  ```bash
  npx react-native run-ios
  ```

- For Android:

  ```bash
  npx react-native run-android
  ```

## Usage

1. Open the app on your device or emulator.
2. Select a workout drill from the list.
3. Follow the instructions and use the timer or input fields to track your progress.
4. Save your results and view your best and average times, reps, or weights.

## Localization

The app supports multiple languages using the `react-i18next` library. To add or update translations, modify the translation files located in the `src/locales` directory.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- React Native
- react-i18next
- react-native-vector-icons

Feel free to reach out if you have any questions or need further assistance.
