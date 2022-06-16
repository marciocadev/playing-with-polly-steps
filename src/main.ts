import { join } from 'path';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { App, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { LoggingLevel, SlackChannelConfiguration } from 'aws-cdk-lib/aws-chatbot';
import { Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Effect, ManagedPolicy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Topic } from 'aws-cdk-lib/aws-sns';
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

    const topic = new Topic(this, 'ErrorTopic', {
      topicName: 'polly-error-topic',
    });

    const lambda = new NodejsFunction(this, 'PollyLambda', {
      functionName: 'playing-with-polly',
      architecture: Architecture.ARM_64,
      entry: join(__dirname, 'lambda-fns/index.ts'),
      handler: 'handler',
      timeout: Duration.seconds(30),
    });
    lambda.addToRolePolicy(pollyStatement);
    const metric = lambda.metricErrors({
      period: Duration.minutes(1),
    });
    const alarm = new Alarm(this, 'PollyAlarm', {
      alarmName: 'polly-alarm-error',
      metric: metric,
      threshold: 1,
      evaluationPeriods: 1,
      comparisonOperator: ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    });
    const snsAction = new SnsAction(topic);
    alarm.addAlarmAction(snsAction);
    alarm.addOkAction(snsAction);
    // alarm.addInsufficientDataAction(snsAction);

    const rest = new HttpApi(this, 'PollyHttpApi', {
      apiName: 'polly-httpapi',
    });
    rest.addRoutes({
      path: '/speech/{voice}',
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration('Integration', lambda),
    });

    const slack = new SlackChannelConfiguration(this, 'MySlack', {
      slackChannelConfigurationName: 'error-message',
      slackWorkspaceId: 'T03L7TWLH09',
      slackChannelId: 'C03KEL2P2KH',
      notificationTopics: [topic],
      loggingLevel: LoggingLevel.INFO,
    });
    slack.role?.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('CloudWatchReadOnlyAccess'),
    );

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