CREATE EXTERNAL TABLE IF NOT EXISTS rainfall (
  station_id STRING,
  value FLOAT,
  -- unable to parse ISO datetime, hence read as string into the table then use Presto to cast to timestamp 
  -- https://aws.amazon.com/premiumsupport/knowledge-center/query-table-athena-timestamp-empty/
  datetime STRING 
  ) 
  ROW FORMAT DELIMITED -- means that Athena will use a default library called LazySimpleSerDe to do the actual work of parsing the data
  FIELDS TERMINATED BY ',' -- fields are comma separated 
  LINES TERMINATED BY '\n' 
  LOCATION 's3://cs4225-rainfall/outputs/'
  TBLPROPERTIES ("skip.header.line.count"="1");

CREATE EXTERNAL TABLE IF NOT EXISTS carparkAvailability (
  Development STRING,
  AvailableLots INTEGER,
  datetime STRING
  ) 
  ROW FORMAT DELIMITED
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  LOCATION 's3://cs4225-carpark-availability/outputs/'
  TBLPROPERTIES ("skip.header.line.count"="1");

CREATE EXTERNAL TABLE IF NOT EXISTS estimatedTravelTime (
  StartPoint STRING,
  EndPoint FLOAT,
  EstTime INTEGER,
  datetime STRING
  ) 
  ROW FORMAT DELIMITED
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  LOCATION 's3://cs4225-estimated-travel-times/outputs/'
  TBLPROPERTIES ("skip.header.line.count"="1");


SELECT station_id, value, from_iso8601_timestamp(datetime) AS datetime FROM rainfall

SELECT AvailableLots, from_iso8601_timestamp(datetime) AS datetime FROM carparkAvailability

SELECT EstTime, from_iso8601_timestamp(datetime) AS datetime FROM estimatedTravelTime


