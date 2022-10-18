# Musala
Musala practical test

1) - Setup
 - open new cmd
 - RUN command  cd ./gateways
 - RUN command docker-compose  up -d
2)- Run the Frontend(Reactjs, Redux, MUI, Webpack)
- open new cmd
 - RUN command cd ./gateways/src/main/webapp
- RUN command  npm install
- RUN command  npm start
3)-Run Backend(Spring webflux,r2dbc,mysql)
- open new cmd
 - cd ./gateways/
- RUN command maven install
- RUN command java -jar /target/gateways-0.0.1-SNAPSHOT.jar
