import { awscdk } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.27.0',
  defaultReleaseBranch: 'main',
  name: 'playing-with-polly-steps',
  projenrcTs: true,

  codeCov: true,
  release: true,

  deps: [
    '@aws-sdk/client-polly',
    '@types/aws-lambda',
  ],
  devDeps: ['aws-sdk-client-mock'],
});
project.synth();