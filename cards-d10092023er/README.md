Business Cards React Project.
Introduction.
Welcome to the Business Cards React Project! This project aims to create a user-friendly web application for managing business cards. Users can create, edit, and delete business cards, as well as mark them as favorites. The application provides features for user authentication, user roles (admin and regular/business user), and dynamic navigation menus based on user permissions.

Technologies Used:
React: Frontend JavaScript library for building user interfaces.
React Router: Library for routing and navigation in React applications.
Material Design: CSS frameworks for styling the application.
Font Awesome or Material Icons: Libraries for including icons in the application.
Axios: Promise-based HTTP client for making HTTP requests from the browser.
JWT (JSON Web Tokens): Standard for creating JSON-based access tokens for user authentication.
Google Maps API: API for embedding Google Maps on web pages.
Features.
ConvertICO is a free online PNG to ICO file converter. It is used to convert Desktop Icons, App Icons as well as the much needed favicons for websites.
 
Dynamic Navigation Menu: The navigation menu adjusts dynamically based on the user's permissions. It includes a search field and a toggle for switching between light and dark mode.

Authentication: Users can register and log in to the application securely. Password fields enforce complexity requirements to enhance security.

Token-based Authentication: Upon successful login, users receive an encrypted token stored in local storage, ensuring secure and authenticated access to the application.

User Management: Admin users have access to a CRM system for managing user accounts. They can change user statuses and delete users (except other admin users).

Favorite Business Cards: Users can mark business cards as favorites, and a dedicated page displays all favorite cards. Users can also remove cards from their favorites list.

Accessibility: The application adheres to accessibility standards by including appropriate titles, alt attributes for images, and visual cues for form validation.
Accessibility: Accessibility in React projects is crucial for ensuring that web applications are usable by everyone, including those with disabilities. This web application is more inclusive and usable for all users, regardless of their abilities or assistive technologies. Here's an explanation of various accessibility concepts in this React project:
Alt Text: Alt text, or alternative text, is used to describe the content of an image. It is essential for users who are visually impaired or for situations where images cannot be loaded. In React, you can include alt text in JSX using the alt attribute of the img element.
Labels: Proper labeling of interactive elements, such as form fields and buttons, is vital for screen reader users to understand the purpose of each element. The project uses the htmlFor attribute with the label element to associate a label with its corresponding form control.(aria-label; show-label).
Titles: Titles for web pages and components help users navigate and understand the content better. You can set the title of a component using the document.title property or the title attribute on specific elements.
Favicon: A favicon is the small icon displayed in the browser tab or next to the URL in the address bar. A favicon helps users identify your website easily when multiple tabs are open.

Dark and light mode: The users have the option to choose between dark and light mode.

Bonus Features
User Profile Editing: Logged-in users can edit their profile details, such as name, email, and password, providing a personalized experience.

Lockout for Failed Login Attempts: The system locks out a user after three consecutive failed login attempts for a specified period, enhancing security against brute force attacks.

Responsive Design
The project utilizes either Bootstrap or Material Design for responsive design, ensuring optimal display across various devices and screen sizes.

Installation and Usage
Clone the repository: git clone <https://github.com/venus1970/react-cards-project/tree/main/cards-d10092023er>
Install dependencies: npm install
Start the development server: npm start
Access the application in your browser at http://localhost:3000
Conclusion
The Business Cards React project aims to provide a modern and efficient solution for managing business cards online. With its robust authentication system, intuitive user interface, and responsive design, it offers a seamless experience for users. Whether you're a business owner managing your contacts or an admin overseeing user accounts, this application provides the tools you need to stay organized and efficient.

For any inquiries, feedback, or issues, please refer to the project's documentation.

Thank you for using the Business Cards React Project! 🚀👩‍💼👨‍💼




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
