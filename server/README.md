# CLIVE ASSESSMENT APP SERVER

### <b>Prerequisite</b>:

> This is a NODE server (ExpressJS framework), PRISMA ORM using POSTGRESQL adapter. Basic understanding of these stacks would be required to collaborate on this project.

#### <b>APP Pakcages</b>:

 <table>
    <tr>
      <th>Package Name</th>
      <th>Use In App</th>
    </tr>
    <tr>
      <td>prisma</td>
      <td>ORM (Orbject Relational Mapping) <a href="https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/postgresql">DOC</a></td>
    </tr>
    <tr>
      <td>dotenv</td>
      <td>Environment variable extraction</td>
    </tr>
    <tr>
      <td>pg</td>
      <td>Postgres adapter for prisma</td>
    </tr>  
    <tr>
      <td>nodemon</td>
      <td>Hot reload on-save and also auto restarts server when crashed</td>
    </tr> 
    <tr>
      <td>express</td>
      <td>NodeJS API framework [DOC](https://expressjs.com/)</td>
    </tr>  
    <tr>
      <td>cors</td>
      <td>CORS authority configuration</td>
    </tr> 
    <tr>
      <td>bcrypt</td>
      <td>Hash texts</td>
    </tr> 
    <tr>
      <td>jwt</td>
      <td>Access token manager</td>
    </tr>    
    <tr>
      <td>rimraf</td>
      <td>It’s essentially a cross‑platform version of rm -rf, Used to remove dist folder before transpiling into ts</td>
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
      <td>docker run -d -p 8080:8080 --name app-server app-server:v1.0.0</td>
    </tr>
    <tr>
      <td>Push Docker image to Dockerhub</td>
      <td>docker tag app-server:v1.0.0 adewaleda/app-server:v1.0.0</td>
    </tr>
    <tr>
      <td>Push local image to repository</td>
      <td>docker push adewaleda/app-server:v1.0.0</td>
    </tr>
    <tr>
      <td>Pull image from DockerHub</td>
      <td>docker pull adewaleda/app-server:v1.0.0</td>
    </tr>
    <tr>
      <td>Stop docker image from running</td>
      <td>`docker ps` `docker stop :CONTAINER_ID`</td>
    </tr>
    </table>

#### <b>.ENV Setup</b>:

 <table>
    <tr>
      <th>VARIABLE</th>
      <th>DESCRIPTION</th>
    </tr>
    <tr>
      <td>DATABASE_URL</td>
      <td>DATABASE URL</td>
    </tr>
    <tr>
      <td>PORT</td>
      <td>App PORT</td>
    </tr>
    <tr>
      <td>LOCALHOST</td>
      <td>Client URL (CORS protection)</td>
    </tr>
    <tr>
      <td>JWT_SECRET_KEY</td>
      <td>JWT secret key</td>
    </tr>
    </table>

#### <b>Folder hierarchy</b>

- routers - interface between client and API (defines all the routes methods)
- controllers - interface between router and service (defines the block responsible for what action)
- services - interfaces between the controller and the model (defines DB calls)

#### <b>Getting the APP running</b>

- run `npm install` (to install all the dependencies)
- run `npm run build` (builds application i.e. transpiles TS file to JS)
- run `npm run start` (start application on default port:8080)
- run `npm run dev` (runs a hot-reload on-save environment with nodemon)
- run `npm run migration:create` (create a prisma migration without reforming DB, useful in checking the generated migration SQL to ensure its query is what is intended to achieve)
- run `npm run generate` (generate client type definition)
- run `npm run migrate` (effect schema changes to connected DB, ideally, it should be the DEV DB)
- run `npm run migrate:prod` (effect schema changes to connected DB, ideally, it should be the PROD DB)
- run `npm run seed` (Seed data into the connected DB)

[PRISMA DOC](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/postgresql)
