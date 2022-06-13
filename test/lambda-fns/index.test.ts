import { Readable } from 'stream';
import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { mockClient } from 'aws-sdk-client-mock';
import { handler } from '../../src/lambda-fns/index';

describe('Polly lambda', () => {
  const pollyMock = mockClient(PollyClient);

  test('success call', async() => {
    const readable = new Readable();
    readable.push('testing stream');
    readable.push(null);

    pollyMock.on(SynthesizeSpeechCommand).resolves({
      AudioStream: readable,
    });

    const event = {
      body: '1, 2, 3, testando',
    } as any;

    const result = await handler(event);

    expect(result).toMatchObject({
      statusCode: 200,
    });
  });
});