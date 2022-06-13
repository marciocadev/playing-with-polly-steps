import { join } from 'path';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // especificamos o recurso que será permitido sintetizar
    // (no caso o Polly, diferente do Dynamo em que criamos
    // uma tabela o Polly temos de indicar que é todo o recurso com *)
    const pollyStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ['*'],
      actions: ['polly:SynthesizeSpeech'],
    });

    const lambda = new NodejsFunction(this, 'PollyLambda', {
      functionName: 'playing-with-polly',
      architecture: Architecture.ARM_64,
      entry: join(__dirname, 'lambda-fns/index.ts'),
      handler: 'handler',
    });
    lambda.addToRolePolicy(pollyStatement);
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'playing-with-polly-steps-dev', { env: devEnv });
// new MyStack(app, 'playing-with-polly-steps-prod', { env: prodEnv });

app.synth();