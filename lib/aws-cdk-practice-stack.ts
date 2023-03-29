import * as cdk from 'aws-cdk-lib'
import { CfnParameter, CfnOutput, Duration, RemovalPolicy } from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

class L3Bucket extends Construct 
{
  constructor(scope: Construct, id: string, expiration: number) 
  {
    super(scope, id)

    new Bucket(this, "L3Bucket", 
    {
      autoDeleteObjects: true,
      lifecycleRules: [{
        expiration: Duration.days(expiration)
      }],
      removalPolicy: RemovalPolicy.DESTROY
    })
  }
}

export class AwsCdkPracticeStack extends cdk.Stack 
{
  constructor(scope: Construct, id: string, props?: cdk.StackProps) 
  {
    super(scope, id, props);

    new CfnBucket(this, "MyL1Bucket", 
    {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: "Enabled"
        }]
      }
    })

    const duration = new CfnParameter(this, "duration", 
    {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: "Number"
    })

    const myL2Bucket = new Bucket(this, "MyL2Bucket", 
    {
      autoDeleteObjects: true,
      lifecycleRules: [{
        expiration: Duration.days(duration.valueAsNumber)
      }],
      removalPolicy: RemovalPolicy.DESTROY
    })

    new CfnOutput(this, "MyL2BucketOutput", 
    {
      value: myL2Bucket.bucketName,
      description: "This is the name of the MyL2Bucket"
    })

    new L3Bucket(this, "M3L3Bucket", 3)
  }
}
