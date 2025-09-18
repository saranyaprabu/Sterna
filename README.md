Project Setup Guide

### Clone the repository
Open a terminal and run:

git clone https://github.com/username/repo-name.git
cd repo-name


### Start the backend (JSON Server)
Open a terminal in the project root and run:

json-server --watch db.json --port 5000

This will start a mock API server at http://localhost:5000

### Install frontend dependencies
Open another terminal in the same project root and run:

npm install

npm start

The frontend will run at http://localhost:3000

### Summary

Terminal 1: json-server --watch db.json --port 5000 (backend)

Terminal 2: npm install && npm start (frontend)