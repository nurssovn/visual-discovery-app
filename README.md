# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


1. Project Proposal 

Project Idea: "Visual Discovery App" is a web-based platform designed for finding, categorizing, and saving visual content. It serves as an interactive image gallery where users can explore inspiration for various projects.
Target Audience: Designers, artists, content creators, and hobbyists looking for structured visual inspiration.
Problem it solves: Finding and organizing visual references across the internet can be chaotic. This app provides a centralized, user-friendly space to discover, filter, and interact with images (similar to moodboards).
MVP Features: An interactive masonry image feed, category-based filtering, individual image view, and basic engagement features (like/comment simulation).

2. SPA Theory Questions 

What is a Single Page Application (SPA)?
A Single Page Application (SPA) is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of the default method of a web browser loading entire new pages. This results in faster transitions and a more native app-like experience.

How does SPA differ from traditional Multi-Page Applications (MPA)?
In a traditional MPA, every time a user clicks a link or submits a form, the browser requests a completely new HTML page from the server, causing a full page reload. In an SPA, only the initial HTML, CSS, and JS are loaded once. Subsequent interactions fetch only necessary data (usually via JSON) and update the DOM dynamically without reloading the page.

What is the Virtual DOM?
The Virtual DOM is a lightweight, in-memory representation of the actual Real DOM. When a component's state changes, React updates the Virtual DOM first, compares it with the previous version (a process called "diffing"), and calculates the most efficient way to update the Real DOM, changing only the necessary elements.

Why does React use a component-based architecture?
Component-based architecture allows developers to break down complex user interfaces into small, isolated, and reusable pieces of code (components). This makes the code easier to maintain, test, and debug. It also promotes code reusability across the application, significantly speeding up the development process.