QuestionTime (QT) Frontend
This is the frontend application for QuestionTime (QT), a platform that allows registered users to set up and manage multiple-choice questions for public respondents. This project provides a user interface to make the question setup process easy.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Clone this repository to your local machine
npm install --save


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

when a new or returning user visits the QT frontend, they will be prompted to request a token.
Enter the user's email address and click on the "Request Token" button.
Upon successful submission, the token will be displayed on the screen and stored for subsequent use.

Question Setup

Once the token is retrieved and stored, users can proceed to set up questions.
Users can view existing questions and their configured options on the main screen.
Users can create new questions by clicking on the "Create Question" button.
Options can be added or removed from questions as needed.
Questions must have a minimum of 3 options and a maximum of 5 options.
Deployment
The QuestionTime frontend can be deployed to various hosting platforms. One recommended option is to deploy on Vercel using the Vercel Platform.

Technologies Used

Next.js
React.js
ReduxtoolkitQuery
Tailwind CSS (for styling)
AntDesign

Acknowledgements

This project was bootstrapped with create-next-app provided by Next.js.
Special thanks to the backend engineers of QT for providing the API support.
