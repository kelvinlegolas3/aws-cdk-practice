import * as cdk from 'aws-cdk-lib'
import { CfnOutput, Fn, RemovalPolicy } from 'aws-cdk-lib'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class PhotoStack extends cdk.Stack 
{
    private stackSuffix: string

    constructor(scope: Construct, id: string, props?: cdk.StackProps) 
    {
        super(scope, id, props)

        this.initializeSuffix()

        const photosBucket = new Bucket(this, "PhotosBucket", 
        {
            bucketName: `photos-bucket-${this.stackSuffix}`,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        })

        new CfnOutput(this, "PhotosBucketOutput", {
            value: photosBucket.bucketArn,
            exportName: "photos-bucket"
        })
    }

    private initializeSuffix()
    {
        const shortStackId = Fn.select(2, Fn.split("/", this.stackId))
        this.stackSuffix = Fn.select(4, Fn.split("-", shortStackId))
    }

}