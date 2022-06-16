import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.28.0',
  defaultReleaseBranch: 'main',
  name: 'playing-with-polly-steps',
  projenrcTs: true,

  codeCov: true,
  release: true,

  deps: [
    '@aws-sdk/client-polly',
    '@types/aws-lambda',
    '@aws-cdk/aws-apigatewayv2-alpha@2.27.0-alpha.0',
    '@aws-cdk/aws-apigatewayv2-integrations-alpha@2.27.0-alpha.0',
  ],
  devDeps: ['aws-sdk-client-mock'],
});
project.synth();