import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MyStack } from '../src/main';

test('Snapshot', () => {
  const app = new App();
  const stack = new MyStack(app, 'test');

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

describe('Lambda', () => {
  let app:App, stack: MyStack, template: Template;

  beforeAll(() => {
    // GIVEN
    app = new App();
    // WHEN
    stack = new MyStack(app, 'test');
    // THEN
    template = Template.fromStack(stack);
  });

  test('Lambda name', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'playing-with-polly',
    });
  });

  test('Lambda arm architecture', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Architectures: ['arm64'],
    });
  });
});