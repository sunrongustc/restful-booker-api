# Restful-booker Playwright Framework

## Overview
API automation framework for the Restful-booker API, covering CRUD operations, negative scenarios, and authentication validation using Playwright and TypeScript.

## Test Strategy
Tests are organised into three categories:
- **Positive** - Verify core CRUD operations work correctly
- **Negative** - Verify error handling for invalid operations
- **Authentication** - Verify protected endpoints return 403 without a valid token

## Tech Stack
- Playwright
- TypeScript
- GitHub Actions

## Project Structure
- `api/` - API layer (BookingApi class)
- `tests/` - Test files
- `data/` - Test data
- `types/` - TypeScript interfaces

### Positive Tests
- Get Booking
- Create Booking
- Update Booking
- Delete Booking

### Negative Tests
- Non-existent Booking
- Delete Booking Twice
- Update Deleted Booking

### Authorization Tests
- Update Without Authentication
- Delete Without Authentication

## Run Tests
npm install
npx playwright install
npx playwright test

# Run with HTML report
npx playwright test --reporter=html