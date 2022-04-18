from pyspark.sql import SparkSession
from pyspark.sql.functions import col

S3_INPUT_PATH = 's3://cs4225-emr-test/data/survey_results_public.csv'
S3_OUTPUT_PATH = 's3://cs4225-emr-test/output'

def main():
    spark = SparkSession.builder.appName('EMR-SPARK-TEST').getOrCreate()
    all_data = spark.read.csv(S3_INPUT_PATH, header=True)
    print('Total number of records in the dataset: %s' % all_data.count())
    selected_data = all_data.where((col('Country') == 'United States' ) & (col('WorkWeekHrs') > 45))
    print('The number of engineers who work more than 45 hrs a week in US are: %s' % selected_data.count())
    selected_data.write.mode('overwrite').parquet(S3_OUTPUT_PATH)
    print('Selected data successfully saved to S3')

if __name__ == '__main__':
    main()