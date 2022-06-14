import { Stream } from 'stream';
import { Engine, OutputFormat, PollyClient, SynthesizeSpeechCommand, SynthesizeSpeechInput, TextType } from '@aws-sdk/client-polly';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

const pollyClient = new PollyClient({ region: process.env.AWS_REGION });

export const handler = async(event:APIGatewayProxyEventV2) => {

  if (!event?.body || !event?.pathParameters) {
    return {
      statusCode: 400,
    };
  }

  let { voice } = event.pathParameters;
  let text = event.body;

  const input:SynthesizeSpeechInput = {
    Text: text,
    VoiceId: voice,
    Engine: Engine.NEURAL,
    TextType: TextType.TEXT,
    OutputFormat: OutputFormat.MP3,
  };
  const command = new SynthesizeSpeechCommand(input);
  const synth = await pollyClient.send(command);

  const buffer = await stream2buffer(synth.AudioStream);

  const result:APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: buffer.toString('base64'),
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  };

  return result;
};

async function stream2buffer(stream:Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();
    stream.on('data', chunk => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', err => reject(`error converting stream - ${err}`));
  });
}