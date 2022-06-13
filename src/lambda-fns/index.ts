export const handler = async(event:any) => {
  return {
    statusCode: '200',
    body: event,
  };
};