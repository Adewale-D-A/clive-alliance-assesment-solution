# BANKING ASSESSMENT PROJECT (CLIENT)

=====================================

### <b>Prerequisite</b>:

This is a client app in ReactJS (Vite Frameword), TailwindCSS, basic undnerstanding of these stacks would be required to collaborate on this project.

#### <b>APP Pakcages</b>:

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

#### <b>Running APP on Docker</b>:

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

#### <b>.ENV Setup</b>:

 <table>
    <tr>
      <th>VARIABLE</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <td>VITE_API_BASE_URL</td>
      <td>BASE API URL</td>
    </tr>
    <tr>
      <td>VITE_AUTH_SESION_KEY</td>
      <td>Client auth session hash key</td>
    </tr>
    <tr>
      <td>VITE_AUTH_PROFILE_KEY</td>
      <td>Client auth profile hash key</td>
    </tr>
    </table>

#### <b>Getting the APP running</b>

- run `npm install` (to install all the dependencies)
- run `npm run build` (builds application i.e. transpiles TS file to JS)
- run `npm run preview` (start application on default port:5173)
- run `npm run dev` (runs a development app)

[PRODUCT REQUIREMENTS DOCUMENT](https://docs.google.com/document/d/1pnuXaGh_KvQyFXnu6TIxn8y0DNguvZ3EDa6MXhnPt7Q/edit?pli=1&tab=t.0#heading=h.qovhhe2036cd)
