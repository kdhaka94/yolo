#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const readline = require('readline');

console.log('YOLO - You Only Load Once');

// Function to read the YAML configuration file
function readConfig() {
  const configPath = path.join(process.cwd(), 'yolo.yml');
  if (!fs.existsSync(configPath)) {
    console.error('Error: yolo.yml not found in the current directory.');
    process.exit(1);
  }
  try {
    return yaml.load(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.error('Error reading yolo.yml:', e);
    process.exit(1);
  }
}

// Function to load environment variables from a file
function loadEnvFile(envFile) {
  const envPath = path.join(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log(`YOLO: Loaded environment from ${envPath}`);
  } else {
    console.log(`YOLO Warning: ${envPath} does not exist.`);
  }
}

// Function to prompt user for environment selection
function promptForEnv(environments) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`YOLO: Select environment (${Object.keys(environments).join('/')}): `, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Main function
async function main() {
  const config = readConfig();
  const environments = config.environments;

  if (Object.keys(environments).length === 0) {
    console.log('YOLO: No environments defined in yolo.yml. Exiting.');
    process.exit(1);
  }

  const selectedEnv = await promptForEnv(environments);
  if (environments.hasOwnProperty(selectedEnv)) {
    loadEnvFile(environments[selectedEnv]);
  } else {
    console.log('YOLO: Invalid environment selected. Exiting.');
    process.exit(1);
  }

  // Run the actual start command
  const { spawn } = require('child_process');
  const npmArgs = process.argv.slice(2);
  spawn('npm', ['run', ...npmArgs], { stdio: 'inherit' });
}

main();