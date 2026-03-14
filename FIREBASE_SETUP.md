# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "game-tracker" (or anything)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Realtime Database

1. In the left sidebar, click "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose location (us-central1 is fine)
4. Start in **test mode** for now (we'll secure it later)
5. Click "Enable"

## Step 3: Get Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (`</>`) to add a web app
5. Register app with nickname "game-tracker"
6. Copy the `firebaseConfig` object

## Step 4: Add Config to Your Site

1. Open `firebase-config.js` in your game-tracker folder
2. Replace the placeholder values with your copied config
3. Save the file
4. Push to GitHub

## Step 5: Test

Reload your game tracker page. Changes will now sync across all devices!

## Security (Optional - Do Later)

Once working, update your Realtime Database Rules to:

```json
{
  "rules": {
    "games": {
      ".read": true,
      ".write": true
    }
  }
}
```

For now, test mode is fine since it's just your personal game list.
