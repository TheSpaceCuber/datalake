from pyspark.sql import SparkSession
from pyspark.sql import functions as F

def main():
    spark = SparkSession.builder.getOrCreate()
    dataframe = spark.read.format("json").load("s3://cs4225-traffic-speed-bands").withColumn("timestamp_raw", F.input_file_name())
    data = []
    array_raw = dataframe.select("value").collect()
    array_timestamp_raw = dataframe.select("timestamp_raw").collect()
    for i in range(len(array_raw)):
        raw = array_raw[i][0]
        timestamp = array_timestamp_raw[i].timestamp_raw[32:48]
        for row in raw:
            data.append([row.LinkID, row.Location, row.MaximumSpeed, row.MinimumSpeed, row.RoadCategory, row.RoadName, row.SpeedBand, timestamp])
    output = spark.createDataFrame(data, ["LinkID", "Location", "MaximumSpeed", "MinimumSpeed", "RoadCategory", "RoadName", "SpeedBand", "timestamp"])
    output.coalesce(1).write.option("header", "true").csv("s3://cs4225-traffic-speed-bands/outputs")

if __name__ == "__main__":
    main()