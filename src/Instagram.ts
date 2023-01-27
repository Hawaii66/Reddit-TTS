import * as dotenv from "dotenv";
dotenv.config();
const request = require("request");

export const what = async () => {
  const access_token = "1dc7e5597160fb9560af04ec0713a551";
  const business_id = "253447653341162";

  const options = {
    method: "GET",
    url: `https://graph.instagram.com/${business_id}`,
    qs: { access_token },
  };

  request(options, function (error: any, response: any, body: any) {
    if (error) throw new Error(error);
    console.log(response, body);
    const data = JSON.parse(body);
    console.log(data.id); // This is the page id
  });
};

what();
