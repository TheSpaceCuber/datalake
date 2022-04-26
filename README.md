# Data Lake Project - Public Transport

Project for CS4225 Big Data Systems for Data Science AY2021/22.

## Cloud Architecture
![Architecture](/media/architecture.png)

## Folders in repository
1. Athena: SQL queries for athena table and queries
2. EMR: Pyspark scripts
3. Frontend: ReactJS
4. Lambda: 2 examples of lambda functions used.
5. Media: Screenshots and photos related to the project
6. Raw Data Examples S3: Example of a raw data output for each API

## Grafana for Charts in the frontend
We used grafana to generate charts for visualization in the frontend.

![grafana-frontend](/media/grafana-graphs-for-frontend.png)

## Frontend 
Graphs visualized and 2 layers (taxis and congestions) to toggle on/off.

![frontend1](/media/frontend-all.png)


## System Monitoring
EMR Metrics exported to Prometheus and visualized in Grafana. 1 master, 2 core (slave) nodes were used.

![monitoring](/media/grafana-monitoring.jpg)