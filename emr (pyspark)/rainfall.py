from pyspark.sql import SparkSession

def main():
    spark = SparkSession.builder.getOrCreate()
    dataframe = spark.read.format("json").load("s3://cs4225-rainfall")
    data = []
    array_id_value = dataframe.select("items.readings").collect()
    array_timestamp = dataframe.select("items.timestamp").collect()
    for i in range(len(array_id_value)):
        timestamp = array_timestamp[i].timestamp[0]
        for row in array_id_value[i][0][0]:
            data.append([row.station_id, row.value, timestamp])
    output = spark.createDataFrame(data, ["station_id", "value", "timestamp"])
    output.coalesce(1).write.option("header", "true").csv("s3://cs4225-rainfall/outputs")

if __name__ == "__main__":
    main()