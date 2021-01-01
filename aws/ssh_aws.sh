#!/bin/bash
echo $(cat aws/ec2.ip)
ssh -i aws/aws-key-pair-london.pem ec2-user@$(cat aws/ec2.ip)