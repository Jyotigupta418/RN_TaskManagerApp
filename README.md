This is a new [React Native](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


![taskmanager screen1](./src/assets/ss1.jpg)
![taskmanager screen2](./src/assets/ss2.jpg)
![taskmanager screen2](./src/assets/ss3.jpg)
![Video description](./src/assets/video.mp4)

# Getting Started

>Note: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start Metro, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For Android: Press the <kbd>R</kbd> key twice or select "Reload" from the Developer Menu (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For iOS: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an overview of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a guided tour of the React Native basics.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native Blog posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub repository for React Native.




# Documentation for the React Native Form Rendering Application

## 1. Introduction:
The React Native Form Rendering Application is developed to provide a user-friendly interface for rendering forms based on XML input. It supports loading XML data from both files and user input. The application aims to handle various field types specified in the XML document, including text fields, date/time fields, radio buttons, and a drawing field. Additionally, it ensures graceful error handling for invalid XML formats or missing elements.

## 2. Components:

### App Component:
- Purpose: The main component responsible for rendering the entire application UI.
- Functions:
  - `renderFormFromFile`: Loads and parses XML data from a file when triggered by the "Render Form from XML File" button.
  - `renderFormFromInput`: Parses XML input provided by the user when triggered by the "Render Form from XML Input" button.
  - `parseXmlFile`: Parses XML data from a file and returns an array of form field objects.
  - `parseXmlInput`: Parses XML input provided by the user and returns an array of form field objects.
- Components Rendered:
  - `ScrollView`: Renders a scrollable view for the entire form.

### Form Component:
- Purpose: Renders the form fields based on the parsed XML data.
- Props:
  - `formFields`: An array of form field objects containing information about each field.
- Components Rendered:
  - `FormField`: Renders each individual form field based on its type.

### FormField Component:
- Purpose: Renders individual form fields based on their type.
- Props:
  - `field`: An object containing information about the form field.
- Conditions:
  - If `field.type` is 'text': Renders a text field using the `AlphabetBox` component.
  - If `field.type` is 'date': Renders a date field using the `DateBox` component.
  - If `field.type` is 'signature': Renders a signature field using the `SignatureCaptured` component.

### AlphabetBox Component:
- Purpose: Renders a text field for capturing alphabetic input.
- Props:
  - `boxLength`: Specifies the maximum length of the text field.
- Features:
  - Handles navigation between text fields based on user input.
  - Scrolls to the top when the keyboard is hidden.
  - Provides error handling for backspace navigation.

### DateBox Component:
- Purpose: Renders a date field for capturing date input.
- Features:
  - Provides separate input fields for day, month, and year.
  - Handles navigation between input fields based on user input.
  - Supports validation for date format.

### RadioButton Component:
- Purpose: Renders a set of radio buttons for selecting options.
- Props:
  - `options`: An array of options to be rendered as radio buttons.
  - `onChange`: A callback function to handle selection changes.

### SignatureCaptured Component:
- Purpose: Renders a field for capturing user signatures or drawings.

## 3. Additional Features:
- "Clear Form" Button: Allows users to clear the rendered form fields.

## 4. Error Handling:
- The application handles errors gracefully, providing console logs for debugging purposes.

## 5. Testing:
- Thoroughly tested with various XML files containing different field types to ensure proper functionality.

## 6. Conclusion:
The React Native Form Rendering Application provides a robust solution for rendering forms based on XML input. It offers a user-friendly interface, supports various field types, and ensures error-free operation.