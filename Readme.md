# Spotify Clone in React Native-Expo

## Description

Spotify Clone is a React Native app built using Expo, designed to replicate core features of the Spotify application. The app provides smooth navigation, audio playback, and visually engaging user interfaces. Features include playing audio tracks, managing playlists, exploring music categories, and interacting with a clean and dynamic UI. The app uses **Jotai** for state management, ensuring efficient handling of the currently playing track, playlists, and user preferences with minimal complexity. Below is a list of the libraries and tools used to bring this app to life.

## Libraries and Tools

- **@expo/vector-icons**: Provides a wide range of customizable icons, used for navigation, buttons, and enhancing the app’s user interface.
- **@react-native-async-storage/async-storage**: Enables local storage of user preferences, recently played tracks, and playlist data for an improved offline experience.
- **@react-navigation/bottom-tabs**: Implements a tab-based navigation bar, allowing users to seamlessly switch between Home, Search, Library, and other sections.
- **@react-navigation/drawer**: Adds a side drawer navigation, useful for accessing additional app features like settings or account details.
- **@react-navigation/native**: Provides the core navigation system, managing screen transitions and user flow across the app.
- **@react-navigation/native-stack**: Supports stack-based navigation, making it easy to navigate between screens such as Now Playing, Playlists, and Search Results.
- **axios**: Handles API requests efficiently, enabling the app to fetch music data, playlists, and other content dynamically.
- **dayjs**: A lightweight library for handling and formatting dates, such as track release dates or recently played timestamps.
- **expo-av**: Provides audio playback functionality, allowing users to play music tracks with controls like play, pause, and skip.
- **expo-linear-gradient**: Creates beautiful gradient backgrounds, enhancing the app's visual appeal and aligning with Spotify's modern design.
- **expo-status-bar**: Manages the appearance of the status bar to match the app’s theme and color scheme.
- **expo-system-ui**: Ensures the app seamlessly integrates with the system’s UI settings, maintaining consistency across devices.
- **jotai**: A lightweight state management library used to handle global state, such as the currently playing track, playlists, and user preferences.
- **millify**: Converts large numbers, such as play counts and follower counts, into readable formats (e.g., "1M" for 1,000,000).
- **nativewind**: A utility-first CSS-like styling library for React Native, making it easier to build and manage consistent styles.
- **react-native-dotenv**: Secures sensitive information like API keys and environment variables, ensuring better app security.
- **react-native-gesture-handler**: Enhances user interaction with swipeable gestures, used in navigation and features like swiping between tracks.
- **react-native-modal**: Provides customizable modal components, useful for displaying dialogs like track details or confirmation prompts.
- **react-native-reanimated**: Enables fluid animations and transitions, providing smooth UI interactions and enhancing the app’s responsiveness.
- **react-native-safe-area-context**: Ensures content is displayed within safe areas, accounting for notches and rounded corners on various devices.
- **react-native-screens**: Optimizes navigation performance by integrating native screen management for smoother transitions.
- **tailwindcss**: A utility-first CSS framework integrated with React Native for efficient and consistent styling of the app’s UI.

These libraries collectively power the Spotify Clone with features like dynamic navigation, state management, and smooth audio playback, offering an engaging and user-friendly experience.

## Preview

<img src="assets/SpotifyGIF.gif" height="500" />

## API

[Spotify-API](https://rapidapi.com/Glavier/api/spotify23)
[Spotify-Scraper](https://rapidapi.com/premium-apis-oanor/api/spotify-scraper3)

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RN-Spotify-Clone.git
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

### If you want to use Voice please run this code

#### Using npm

```bash
npx expo run android
```

#### Using Yarn

```bash
yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
