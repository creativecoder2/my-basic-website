const path = require('path');
const fs = require('fs');
const { devices } = require('@playwright/test');  // Import devices

module.exports = {
  testDir: './landingscreen',  // Path to your test directory
  workers: 2,
  timeout: 60000,              // Test timeout (adjust as necessary)
  use: {
    headless: false,           // Run in headless mode (false means visible browser)
    video: {
      mode: 'on',              // Always record videos for all tests
    },
    contextOptions: {
      recordVideo: {
        dir: path.join(__dirname, 'test-results'),  // Directory to save videos
      },
    },
    screenshot: 'only-on-failure',  // Take screenshots only on failure
    trace: 'on',               // Optional: enables trace recording
    ...devices['iPhone 11'],   // Add device configuration here
  },
  reporter: [
    ['list'],                  // Display results in the terminal
  ],
  testHooks: {
    async afterEach({ test, browserContext }) {
      const videoPath = test.info().video; // Get the path of the video
      if (videoPath) {
        try {
          // Sanitize the test name for use in the file system (remove special characters)
          const sanitizedTestName = test.title.replace(/[^a-zA-Z0-9]/g, '_');
          
          // Build the new video path using sanitized test name
          const newVideoPath = path.join(__dirname, 'test-results', `${sanitizedTestName}.mp4`);

          // Rename the video file to match the test name
          fs.renameSync(videoPath, newVideoPath);
          console.log(`Video saved as: ${newVideoPath}`);
        } catch (error) {
          console.error('Error renaming video:', error);
        }
      }
    },
  },
};
