import { Stack, StackProps } from 'aws-cdk-lib'
import { Fn } from 'aws-cdk-lib'
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

interface PhotoHandlerStackProps extends StackProps 
{
    targetBucketArn: string
}

export class PhotoHandlerStack extends Stack 
{
    constructor(scope: Construct, id: string, props: PhotoHandlerStackProps) 
    {
        super(scope, id, props)

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
                TARGET_BUCKET: props.targetBucketArn
            }
        })
    }
}