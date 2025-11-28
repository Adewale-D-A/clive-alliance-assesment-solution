# BANKING ASSESSMENT PROJECT (CLIENT)

=====================================

### Project Overview

This is a banking assessment app.

### Features

> Packages used in this project

 <table>
    <tr>
      <th>Package Name</th>
      <th>Use In App</th>
    </tr>
    <tr>
      <td>react-redux @reduxjs/toolkit</td>
      <td>Store data management is done using Redux <a href="https://redux-toolkit.js.org/introduction/getting-started">DOCUMENTATION</a></td>
    </tr>
    <tr>
      <td>tailwindcss</td>
      <td>CSS styling library</td>
    </tr>
    <tr>
      <td>framer-motion</td>
      <td>Component and container animation effects</td>
    </tr>
    <tr>
      <td>axios</td>
      <td>HTTP requests handler</td>
    </tr>
    <tr>
      <td>react-hook-form</td>
      <td>Form validation management</td>
    </tr>
    <tr>
      <td>@hookform/resolvers</td>
      <td>Schemas to form types</td>
    </tr>
    <tr>
      <td>zod</td>
      <td>Form schemas type definition</td>
    </tr>
    <tr>
      <td>lucid-react</td>
      <td>Icons pack</td>
    </tr>
    <tr>
      <td>class-variance-authority</td>
      <td>Components props variants feature</td>
    </tr>
    <tr>
      <td>@radix-ui</td>
      <td>Reusable componenet templates</td>
    </tr>
  </table>

> Docker commands and usage

 <table>
    <tr>
      <th>Task</th>
      <th>Docker commands <a href="https://medium.com/@srijaanaparthy/step-by-step-guide-to-install-docker-on-amazon-linux-machine-in-aws-a690bf44b5fe">set up docker on ec2 instance</a></th>
    </tr>
    <tr>
      <td>Build a docker image using docker compose</td>
      <td>docker-compose build</td>
    </tr>
    <tr>
      <td>Run the image locally</td>
      <td>docker run -d -p 8080:3000 --name client-bank-app client-bank-app</td>
    </tr>
    <tr>
      <td>Push Docker image to Dockerhub</td>
      <td>docker tag client-bank-app adewaleda/client-bank-app</td>
    </tr>
    <tr>
      <td>Push local image to repository</td>
      <td>docker push adewaleda/client-bank-app</td>
    </tr>
    <tr>
      <td>Pull image from DockerHub</td>
      <td>docker pull adewaleda/client-bank-app</td>
    </tr>
    </table>

> ENV file entries

 <table>
    <tr>
      <th>VARIABLE</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <th>REACT_APP_API_BASE_URL</th>
      <th>BASE API URL</th>
    </tr>
    <tr>
      <td>REACT_APP_AUTH_SESION_KEY</td>
      <td>Client auth session hash key</td>
    </tr>
    <tr>
      <td>REACT_APP_AUTH_PROFILE_KEY</td>
      <td>Client auth profile hash key</td>
    </tr>
    <tr>
      <td>MAPS_API_KEY</td>
      <td>Googles maps API key</td>
    </tr>
    </table>
