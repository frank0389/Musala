# Musala
Musala practical test

1) - Setup
 - open new cmd
 - RUN command  cd ./gateways
 - RUN command docker-compose  up -d
2) - Run the Frontend (Reactjs, Redux, MUI, Webpack, babel, ... )
- open new cmd
 - RUN command cd ./gateways/src/main/webapp
- RUN command  npm install
- RUN command  npm start
3) - Run Backend(Spring webflux,Spring security, r2dbc,jpa,mysql, ...)
- open new cmd
 - cd ./gateways/
- RUN command maven install
- RUN command java -jar /target/gateways-0.0.1-SNAPSHOT.jar

Note: For production deployment, you only need to execute step 3, then you can access to url 'http://localhost:8080' 
    I used frontend maven plugin and maven resource plugin to compile and copy the frontend to spring boot static folder jar.
