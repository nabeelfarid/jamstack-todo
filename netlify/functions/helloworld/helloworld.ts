import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const name = event.queryStringParameters.name || "Ts";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello World from ${name} ` }),
  };
};

export { handler };

// // Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// const handler = async (event) => {
//   try {
//     const subject = event.queryStringParameters.name || 'World'
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: `Hello ${subject}` }),
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     }
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() }
//   }
// }

// module.exports = { handler }
