const path = require('path');
const fs = require('fs');
const { devices } = require('@playwright/test');

module.exports = {
  testDir: './landingscreen', // Path to your test directory
  workers: 2,
  timeout: 60000, // Test timeout (adjust as necessary)
  use: {
    headless: false, // Run in headless mode (false means visible browser)
    video: {
      mode: 'on', // Always record videos for all tests
    },
    contextOptions: {
      recordVideo: {
        dir: path.join(__dirname, 'test-results'), // Directory to save videos
      },
    },
    screenshot: 'only-on-failure', // Take screenshots only on failure
    trace: 'on', // Optional: enables trace recording
  },
  reporter: [
    ['list'], // Display results in the terminal
  ],
  testHooks: {
    async afterEach({ test, browserContext }) {
      const videoPath = test.info().video; // Get the path of the video
      if (videoPath) {
        try {
          const sanitizedTestName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
          const newVideoPath = path.join(__dirname, 'test-results', `${sanitizedTestName}.mp4`);
          fs.renameSync(videoPath, newVideoPath);
          console.log(`Video saved as: ${newVideoPath}`);
        } catch (error) {
          console.error('Error renaming video:', error);
        }
      }
    },
  },
};
