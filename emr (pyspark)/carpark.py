from pyspark.sql import SparkSession
from pyspark.sql import functions as F

def main():
    spark = SparkSession.builder.getOrCreate()
    dataframe = spark.read.format("json").load("s3://cs4225-carpark-availability").withColumn("timestamp_raw", F.input_file_name())
    data = []
    array_development_lots = dataframe.select("value").collect()
    array_timestamp_raw = dataframe.select("timestamp_raw").collect()
    for i in range(len(array_development_lots)):
        development_lots = array_development_lots[i][0][0]
        timestamp = array_timestamp_raw[i].timestamp_raw[33:49]
        data.append([development_lots.Development, development_lots.AvailableLots, timestamp])
    output = spark.createDataFrame(data, ["Development", "AvailableLots", "timestamp"])
    output.write.option("header", "true").csv("s3://cs4225-carpark-availability/outputs")

if __name__ == "__main__":
    main()