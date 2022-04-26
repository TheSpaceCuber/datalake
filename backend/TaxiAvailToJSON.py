from datetime import timezone, datetime
import boto3
import pandas as pd
import json


client = boto3.client(
    's3',
    aws_access_key_id = 'AKIAYWR4TSJWZUC5UW5Z',
    aws_secret_access_key = '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',
    region_name = 'ap-southeast-1'
)

clientResponse = client.list_buckets()


# Get the latest taxi availablity
# today = date.today().strftime("%Y-%m-%d")
today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

objs = client.list_objects_v2(Bucket='cs4225-taxi-availability', Prefix = today)['Contents']
obj = objs[-1]

obj = client.get_object(Bucket = 'cs4225-taxi-availability',Key = obj["Key"])

temp = obj["Body"].read().decode('utf-8')
a = json.loads(temp)
coordLst = a["value"]

jsonTemplate = {"type": "Taxi Layer", "features": []}

### GeoJSON Format (Not required for now)
# for coord in coordLst:
#     template = {"geometry": {"type":"Point", "coordinates":[]}, "type":"Feature", "properties":"1" }
#     template["geometry"]["coordinates"].append(coord["Longitude"])
#     template["geometry"]["coordinates"].append(coord["Latitude"])
#     jsonTemplate["features"].append(template)

### Simpler Format
for coord in coordLst:
    template = {"coordinates":[]}
    template["coordinates"].append(coord["Latitude"])
    template["coordinates"].append(coord["Longitude"])
    jsonTemplate["features"].append(template)

json_dump = json.dumps(jsonTemplate)
client.put_object(Body = json_dump, Bucket = "testgeojsonbuck",Key = "taxiavailablitylatest.json")