# Serverless Chat

## Description

- User registration with email, Google, and Facebook using Firebase Authentication.
- Login with email, Google, and Facebook using Firebase Authentication.
- Send friend requests to both registered and non-registered users. Non-registered users receive an invitation via email to join the application using Trigger Email.
- Handling friend requests. Users can accept or reject requests.
- Conversations with friends. The users who are friends of the logged-in user are listed, and when one is selected, the chat between them is displayed.
- View the latest message in the friends' list.
- In-app notifications when receiving messages.
- Security: Security rules are implemented for Firestore to prevent unauthorized access to data.

## Screenshots

<img width="700" alt="image" src="https://github.com/santitopo/serverless-chat-firebase/assets/43559181/f2c82386-36dc-48b0-9c5b-296a352b6d83">

<img width="700" alt="image" src="https://github.com/santitopo/serverless-chat-firebase/assets/43559181/98a4e76c-4d3a-41d7-adc6-acd625ebc6d9">




## Project execution

First, navigate to the root folder of the project.
Once in the root folder, run the following commands to run the application:

1.  `npm ci`
2.  `npm start`

## Ejecución de pruebas

If you have Firebase Emulators in the root folder of the project, run `firebase emulators:start`.
In another console, in the root folder of the project, run:

1. `cd tests`
2. `npm ci`
3. `npm run test`

## Public link

https://chat-serverless-89e6b.web.app
