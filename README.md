# todo-App
To do lists application

This is a simple **Todo List** app. It is made with **React** for the frontend, **Express** for the backend, and **MongoDB** to save the tasks.

## Features

- **Add tasks** to your todo list.
- **View tasks** in the list.
- **Update tasks** to change their status.
- **Delete tasks** when you no longer need them.
- Tasks are saved in a **MongoDB** database so you don’t lose them.

## Technologies Used

- **Frontend**: React
- **Backend**: Express.js
- **Database**: MongoDB

## Getting Started

### Prerequisites

You need to have these installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community)

### Install Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/PARZIVAL719/todo-App
   cd todo-App

2. Go to the **server** folder and install the backend dependencies:
   
   ```bash
   cd server
   npm init -y
   npm install express
   npm install mongoose
   npm install nodemon
   npm install cors

3. Go to the **client** folder and install the frontend dependencies:
   
   ```bash
   cd client
   npx create-react-app client
   npm install axios
