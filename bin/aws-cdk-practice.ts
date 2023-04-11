#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PhotoHandlerStack } from '../lib/PhotoHandlerStack';
import { PhotoStack } from '../lib/PhotoStack';

const app = new cdk.App();
const photoStack = new PhotoStack(app, 'PhotoStack');
new PhotoHandlerStack(app, 'PhotoHandlerStack', 
{
    targetBucketArn: photoStack.bucketArn
});