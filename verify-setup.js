#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying Playwright setup...\n');

// Check Node.js version
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.log('❌ Node.js not found');
  process.exit(1);
}

// Check npm version
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.log('❌ npm not found');
  process.exit(1);
}

// Check if package.json exists
if (fs.existsSync('package.json')) {
  console.log('✅ package.json found');
} else {
  console.log('❌ package.json not found');
  process.exit(1);
}

// Check if playwright.config.js exists
if (fs.existsSync('playwright.config.js')) {
  console.log('✅ playwright.config.js found');
} else {
  console.log('❌ playwright.config.js not found');
  process.exit(1);
}

// Check if tests directory exists
if (fs.existsSync('tests') && fs.statSync('tests').isDirectory()) {
  const testFiles = fs.readdirSync('tests').filter(file => file.endsWith('.spec.js'));
  console.log(`✅ tests directory found with ${testFiles.length} test files`);
} else {
  console.log('❌ tests directory not found');
  process.exit(1);
}

// Check if .env file exists
if (fs.existsSync('.env')) {
  console.log('✅ .env file found');
} else {
  console.log('⚠️  .env file not found (this is okay for CI)');
}

// Check Playwright installation
try {
  const playwrightVersion = execSync('npx playwright --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Playwright version: ${playwrightVersion}`);
} catch (error) {
  console.log('❌ Playwright not installed or not working');
  console.log('Run: npm install && npx playwright install');
  process.exit(1);
}

console.log('\n🎉 Setup verification completed successfully!');
console.log('\nTo run tests locally:');
console.log('  npm test');
console.log('  npm run test:headed');
console.log('  npm run test:ui');