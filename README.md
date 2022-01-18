# Global Snacker

Global Snacker is a website that sells hard-to-find snacks from around the world. It was built as a group project during my time at Fullstack Academy. This is a fork of the original project that I have continued to work on after graduating.

![alt text](https://github.com/rfmcmillan/global-snacker/blob/main/public/assets/GlobalSnackerHome.png?raw=true)

## What We Learned

1. Authentication with JWT and Bcrypt
2. State management with Redux
3. Unit-testing with Mocha and Chai
4. Continuous integration with Travis-CI
5. Material Design with Material UI
6. Payment processing with Stripe
7. Google Maps API

A live demo is available at https://global-snacker-1.herokuapp.com/#/. If you have Node and PostgreSQL installed on your machine and would like to install GlobalSnacker to run locally please follow the instructions below.

## Installation

Clone this repo.

```bash
git clone https://github.com/rfmcmillan/global-snacker.git
```

Use npm to install GlobalSnacker along with all its' dependencies.

```bash
npm install
```

Start the app.

```bash
npm run start
```

The app should now be running locally.

## Contributors

- Yiru Ding
  - Front-End: Google Maps integration
  - Back-End: Country routes and model
- Kevin Flessa
  - Front-End: Google Maps integration
  - Back-End: Authentication, Order routes and model, Stripe integration
- Russel McMillan
  - Front-End: Home page, All Products page, Single Product view, Log In page, Administration area
  - Back-End: Authentication, User routes and model, Rating routes and model
- Alejandra Villanueva
  - Front-End: Home page, All Products page
  - Back-End: Category routes and model, Product routes and model
