This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to deploy to docker

In the project directory, run this command:

### `docker build . -t react-docker`

To see the list images built in your system, run the following command:

### `docker images`

How to run the container, run this command:

### `docker run -p 8000:80 react-docker`

Now open http://localhost:8000 in your browser to check its running.
