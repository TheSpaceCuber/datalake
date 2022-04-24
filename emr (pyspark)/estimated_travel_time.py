from pyspark.sql import SparkSession
from pyspark.sql import functions as F

def main():
    spark = SparkSession.builder.getOrCreate()
    dataframe = spark.read.format("json").load("s3://cs4225-estimated-travel-times").withColumn("timestamp_raw", F.input_file_name())
    data = []
    array_start_end_time = dataframe.select("value").collect()
    array_timestamp_raw = dataframe.select("timestamp_raw").collect()
    for i in range(len(array_start_end_time)):
        start_end_time = array_start_end_time[i][0][0]
        timestamp = array_timestamp_raw[i].timestamp_raw[35:51]
        data.append([start_end_time.StartPoint, start_end_time.EndPoint, start_end_time.EstTime, timestamp])
    output = spark.createDataFrame(data, ["StartPoint", "EndPoint", "EstTime", "timestamp"])
    output.coalesce(1).write.option("header", "true").csv("s3://cs4225-estimated-travel-times/outputs")

if __name__ == "__main__":
    main()