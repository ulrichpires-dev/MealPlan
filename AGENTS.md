# MealPlan — Project Context & Current State (Ist-Stand)

## 1. Project Overview

**Project name:** MealPlan  
**Previous folder/project name:** MaListeCourses  
**Project location on Windows:**

`C:\Users\Anwender\MaListeCourses`

MealPlan is a family-oriented meal-planning and grocery-list application.

The main purpose is to help users organize their own meals, plan what they want to eat during the coming week, and automatically generate a consolidated shopping list.

The application is NOT intended to be a recipe catalog with hundreds of predefined recipes. Users should build their own personal meal library over time.

### Main user workflow

1. A user creates a personal account.
2. The user adds meals to their own meal library.
3. Each meal contains:
   - Meal name
   - Ingredients
   - Ingredient quantities
   - Units
   - Reference portion count
4. The user selects meals for an upcoming week.
5. The user specifies how many portions are needed for each selected meal.
6. MealPlan scales ingredient quantities according to the requested portions.
7. Ingredients that are compatible and identical are combined into one shopping-list entry.
8. The user checks off items while shopping.
9. The user can revisit previous shopping lists.

The main target audience is families and people who organize meals and grocery shopping for a household.

Future functionality may include sharing meal plans and shopping lists with family members. This should not be implemented prematurely unless it is part of the agreed roadmap.

---

## 2. Product Vision and Design

MealPlan should feel:

- Warm
- Family-friendly
- Simple
- Practical
- Modern
- Easy to understand for non-technical users

### Brand colors

The chosen visual direction is:

- Primary green
- Cream / warm background
- Earthy brown
- Orange accent

The welcome screen currently uses the following colors:

- Background: `#FFF4E6`
- Primary green: `#2E7D32`
- Dark green text: `#14532D`
- Brown text: `#6D4C41`

### Logo

The chosen logo is a house outline framing a grocery basket with vegetables, accompanied by the MealPlan wordmark and the tagline:

`PLAN • EAT • SHOP • ENJOY`

The current logo file is located at:

`assets/images/MealPlan_ Frische Küche zuhause.png`

The filename contains spaces and a special character. Be careful when referencing it.

The current code uses this path:

```tsx
require('../../assets/images/MealPlan_ Frische Küche zuhause.png')
```

Do not rename or remove the logo without asking first.

---

## 3. Current Technology Stack

The project is a React Native application built with Expo.

Current environment:

- Operating system: Windows
- IDE: Visual Studio Code
- AI coding assistant: OpenAI Codex
- Runtime: Node.js
- Package manager: npm
- Mobile testing: Android phone using Expo Go
- Project framework: Expo SDK 58
- React: 19.3.0
- React Native: 0.88.0
- Expo Router: expected SDK 58 compatible version
- TypeScript

The project was initially created using `create-expo-app`.

The user is a beginner in programming. Explain technical decisions clearly and provide instructions in small, manageable steps.

---

## 4. Current Application State (Ist-Stand)

### Implemented

The application has a basic welcome screen.

The screen currently includes:

- Warm cream background
- MealPlan logo
- Welcome title
- Short explanatory text
- A visual "Get started" button

The welcome screen was successfully displayed on the user's Android phone using Expo Go after correcting the logo asset path.

The current screen is a visual starting point only.

The "Get started" element is currently a styled `View` containing text, not yet a functional navigation button.

### Current screen code

The current `src/app/index.tsx` was previously structured approximately as follows:

```tsx
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF4E6" />

      <Image
        source={require('../../assets/images/MealPlan_ Frische Küche zuhause.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to MealPlan</Text>

      <Text style={styles.subtitle}>
        Plan your meals, organize your groceries,
        and make family shopping easier.
      </Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </View>
    </View>
  );
}
```

This is a reference for the existing implementation, not a request to overwrite the file. Inspect the actual source before changing anything.

---

## 5. Dependency Installation History and Current State

The project originally contained SDK 57 dependencies.

The Expo Go application on the user's Android phone was updated to SDK 58, which led to compatibility issues.

The project was then updated to Expo SDK 58.

The `package.json` currently declares SDK 58-compatible dependencies, including:

```json
{
  "expo": "^58.0.0",
  "expo-router": "~58.0.25",
  "expo-symbols": "~58.0.4",
  "react": "19.3.0",
  "react-dom": "19.3.0",
  "react-native": "0.88.0",
  "@types/react": "~19.3.0"
}
```

Other Expo packages are also declared using SDK 58-compatible versions.

### Important installation issue

The previous `package-lock.json` contained older SDK 57 versions, including:

- `expo-router@57.0.29`
- `expo-symbols@57.0.3`

This caused npm dependency resolution errors (`ERESOLVE`).

The old lockfile was renamed to:

`package-lock.backup.json`

Then the following command was successfully executed:

```cmd
npm install
```

The latest successful result was:

```text
added 579 packages, and audited 580 packages in 2m

56 packages are looking for funding

21 vulnerabilities (2 moderate, 19 high)
```

A new `package-lock.json` was generated.

### Security warnings

npm reported 21 vulnerabilities.

Do not run:

```cmd
npm audit fix --force
```

This was explicitly avoided because it can introduce incompatible package versions or breaking changes.

The vulnerabilities should be investigated separately, without blindly forcing dependency upgrades.

### Current verification status

The following command was proposed as the next step:

```cmd
npx expo install --check
```

**Its result has not yet been received.**

Do not assume that all Expo dependencies are correctly aligned until this command has been checked.

---

## 6. Known Issues and Important Notes

### Expo Go connectivity

The user previously experienced:

- Expo tunnel errors involving `@expo/ngrok`
- A "Cannot connect to Expo CLI" message on the phone
- SDK 57 / SDK 58 incompatibilities

The welcome screen was eventually displayed on the phone after correcting the logo path.

The current runtime status after the most recent dependency installation has not yet been verified.

### Ngrok

The project has `@expo/ngrok` installed.

A previous tunnel attempt failed with an error similar to:

```text
TypeError: Cannot read properties of undefined (reading 'body')
```

Do not assume that tunnel mode is currently working.

### Windows terminal

The correct project directory is:

```cmd
cd C:\Users\Anwender\MaListeCourses
```

Always ensure commands are executed from this directory.

The user previously ran Expo commands from the parent directory, which caused errors because `package.json` was not found.

---

## 7. Agreed Development Roadmap

The proposed next application features are:

1. Functional navigation
2. My Meals — personal meal library
3. Add / edit meal functionality
4. Meal Plan — weekly meal planning
5. Portion selection
6. Ingredient quantity scaling
7. Shopping List — consolidated grocery list
8. Check-off functionality for grocery shopping
9. Access to previous shopping lists

The app should be built incrementally.

Do not implement authentication, backend infrastructure, family sharing, or complex features prematurely. First establish a stable and functional MVP.

---

## 8. Instructions for Codex

Please continue the existing project rather than recreating it.

### First actions

1. Inspect the current project structure.
2. Read `package.json`.
3. Inspect `app.json`.
4. Inspect `src/app/index.tsx`.
5. Check the current Expo Router structure.
6. Verify the current dependency installation.
7. Run appropriate non-destructive checks.

Do not assume that the project structure matches a standard Expo template. Inspect the actual files.

### Development rules

- Preserve the existing MealPlan branding and logo.
- Avoid unnecessary dependency changes.
- Do not run `npm audit fix --force`.
- Do not delete files or folders without explaining why.
- Do not overwrite existing code without inspecting it.
- Avoid changing several unrelated files at once.
- Explain what each important change does.
- Prefer small, testable steps.
- Keep the application compatible with Expo SDK 58 and the installed Expo Go version.
- Do not claim that a feature works until it has been tested or its limitations are explained.

The user is a beginner and appreciates clear, step-by-step guidance.

### Immediate objective

**First, verify that the current Expo SDK 58 installation is healthy.**

Check the output of:

```cmd
npx expo install --check
```

Then, if the dependencies are compatible, test the app using:

```cmd
npx expo start
```

If problems occur, diagnose them before changing the project architecture.

Once the app runs reliably, continue with the first functional feature: navigation from the welcome screen to the main MealPlan application.

