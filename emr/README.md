# AWS EMR guide

1. Go to AWS EMR, ensure region is Singapore, click Create Cluster.

![Image1](https://user-images.githubusercontent.com/43946966/164013801-567a8d5e-3960-4aac-b8ef-29cfb7a992bb.png)

2. Give a name or leave it as default (My cluster), set the s3 folder as follows: cs4225-spark.

![Image2](https://user-images.githubusercontent.com/43946966/164014578-8d12c3ae-d352-4e50-a8ad-776a41b359aa.png)

3. Change "applications" to spark, instance type to m4.large, ensure auto termination is anabled.

![Image3](https://user-images.githubusercontent.com/43946966/164014858-54e7dbec-7bff-45e3-bc7a-09aaa70aa23f.png)

4. Select key pair as emr-spark. You'll need to have the .pem file locally in order to ssh into the master node using the key pair. Ask for help if you do not have the file. Click create cluster when done.

![Image4](https://user-images.githubusercontent.com/43946966/164015428-443521ed-a195-4f92-945f-041989cac80f.png)

5. Cluster will take a while (5-20 mins to provision and launch).

6. To ensure you have permission to SSH into master node, click on security groups for master, followed by the master security group, followed by edit inbound rules.


![Image5](https://user-images.githubusercontent.com/43946966/164025615-6de3fc20-a439-4ff4-b87a-a1bd6eb3b1e3.png)

7. Ensure that there is an entry SSH with 0.0.0.0 (which means any IP can SSH into the instance), if not, edit the SSH entry to allow from any IPV4 address. Save it.

![Image6](https://user-images.githubusercontent.com/43946966/164026588-34410060-b1af-46db-a65a-0fa1e3bce2c5.png)



8. Go back and click on "connect to the master node using SSH".

![Image8](https://user-images.githubusercontent.com/43946966/164016484-26e2dfdc-f765-4c75-a0c1-391adfa2b04f.png)

9. Follow the instructions. Before you SSH into the master node, you might want to copy your local python file via scp into the master node first.

```
scp -i /path/my-key-pair.pem /path/my-file.txt ec2-user@my-instance-public-dns-name:path/

# example
scp -i emr-spark.pem test.py hadoop@ec2-13-228-168-31.ap-southeast-1.compute.amazonaws.com:~/.
```

![Image9](https://user-images.githubusercontent.com/43946966/164016092-7e74953d-d76a-4d0d-a024-705a9eac15a6.png)

```
# example according to the photo, but change the fields accordingly
ssh -i emr-spark.pem hadoop@ec2-13-228-168-31.ap-southeast-1.compute.amazonaws.com
```
Full example:
![Image10](https://user-images.githubusercontent.com/43946966/164027080-c212cb49-d41d-481b-ac45-2b0c74b60a25.png)]

10. Terminate the instance manually if you're done.

![Image11](https://user-images.githubusercontent.com/43946966/164027367-ac916b97-07e2-4269-af67-791b2bafaec3.png)]
