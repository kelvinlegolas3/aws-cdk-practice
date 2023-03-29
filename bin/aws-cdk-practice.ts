#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { PhotoHandlerStack } from '../lib/PhotoHandlerStack';
import { PhotoStack } from '../lib/PhotoStack';

const app = new cdk.App();
new PhotoStack(app, 'PhotoStack');
new PhotoHandlerStack(app, 'PhotoHandlerStack');