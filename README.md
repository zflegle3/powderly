# Powderly - Get the most powder out of your winter sports experience!

[Check Out Powderly Here!](https://zflegle3.github.io/powderly)

## Summary

Powderly is a cutting-edge winter weather scanning application that empowers users to optimize their skiing and snowboarding experiences by accessing real-time weather conditions at over 400 mountains across the United States. Built with advanced technologies such as React.js, Redux, and the Google Maps API, the client side of the app offers a user-friendly map interface that allows for effortless navigation and quick access to the best ski conditions available. On the server side, Powderly utilizes Node.js, Express.js, and MongoDB to ensure that the application's weather data is updated regularly, providing up-to-date information that is critical for making informed decisions. With Powderly, users can confidently explore the slopes and experience the thrill of fresh powder to the fullest extent.

## Getting Started
To get started, you will need to [sign up for an account](https://zflegle3.github.io/powderly). Once you have signed up using your email and password, you will be able to access the dashboard where you can search for ski conditions across the US, manage your favorite mountains, upload a profile avatar, and more!

## Features 
* Robust user authentication:
  * Email and password sign-up/login
  * Password reset via email 
  * Client and server side validation for all user inputs
* RESTful API for user CRUD functions: 
  * Update profile details (email, username, password)
  * Set color theme preference
  * Upload avatar images
  * Add and remove favorite resorts
* Google Maps based UI:
  * Sets initial search marker at user's current location if user opts in
  * Search results populated with Google Place Autocomplete API
  * Quickly accessable sort buttons to sort/filter resorts
  * Recenter button to refocus on search marker
  * Resort recenter button to focus on resort marker
  * Conditionally rendered resort icons based on current weather contions 
  * Clickable markers with abbreviated current weather conditions
* Fully responsive design:
  * Displays search results as a side panel (desktop) or bottom sheet (mobile)
  * Expandable results items to display details of current, historic, and future weather conditions
  

## Technologies
* JavaScript
* React.js
* Node.js
* Express.js
* MongoDB
* Mongoose
* Redux
* Google Maps API
* SASS
* JSON Web Tokens
* Cheerio
* GSAP

#### Desktop:
![demo image](https://raw.githubusercontent.com/zflegle3/powderly/main/src/images/demo.png)
