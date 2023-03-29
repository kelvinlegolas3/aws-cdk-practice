import * as cdk from 'aws-cdk-lib'
import { Fn } from 'aws-cdk-lib'
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

export class PhotoHandlerStack extends cdk.Stack 
{
    constructor(scope: Construct, id: string, props?: cdk.StackProps) 
    {
        super(scope, id, props)

        const targetBucket = Fn.importValue("photos-bucket")

        new LambdaFunction(this, 'PhotosHandlerLambda', 
        {
            runtime: Runtime.NODEJS_16_X,
            handler: "index.handler",
            code: Code.fromInline(`
                exports.handler = async (event) => {
                    console.log("hello!: " + process.env.TARGET_BUCKET)
                }
            `),
            environment: 
            {
                TARGET_BUCKET: targetBucket
            }
        })
    }
}