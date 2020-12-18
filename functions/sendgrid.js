const directusclient = require('@directus/sdk-js')
const client = require("@sendgrid/client")

// function sendEmail(clientfull, subject, message, senderEmail, senderName) {
//   return new Promise((fulfill, reject) => {
//     const data = {
//       from: {
//         email: senderEmail,
//         name: senderName
//       },
//       subject: 'Directus - Netlify Function - Sendgrid Email' + subject,
//       to: 'stephan@thegovlab.org',
//       // to: '',
//       html: `Hey, you\'ve triggered a webhook from Directus and sent an email from Netlify Functions<br/>Message:<br/> ${message}`
//     }
//
//     client
//       .send(data)
//       .then(([response, body]) => {
//         fulfill(response)
//       })
//       .catch(error => reject(error))
//   })
// }

exports.handler = function(event, context, callback) {

  console.log(event);
  console.log(context);
  console.log(callback);
  console.log(event.body);


  const {
    SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME,
    DIRECTUS_SG_API_KEY,
    DIRECTUS_COLLECTION_API_KEY,
    DIRECTUS_LOGIN,
    DIRECTUS_PWD
  } = process.env

  const body = JSON.parse(event.body);

    const directus = new directusclient('http://dev.thegovlab.com:8055/');
      directus.items('test').read(body.item).then(response => {
        console.log(response);
      })

                      client.setApiKey(SENDGRID_API_KEY);

                      const request = {
            method: 'GET',
            url: '/v3/marketing/lists'
          };
          client.request(request)
              .then(([response, body]) => {
                console.log(response.statusCode);
                console.log(body);
              })

  //             var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.sendgrid.com/v3/marketing/singlesends",
  //   "method": "POST",
  //   "headers": {
  //     "authorization": "Bearer "+SENDGRID_API_KEY
  //   },
  //   "data": "{\"name\":\"The Govlab\",\"categories\":[\"string\"],\"send_at\":\"string (optional)\",\"send_to\":{\"list_ids\":[\"string\"],\"segment_ids\":[\"string\"],\"all\":\"boolean (optional)\"},\"email_config\":{\"subject\":\"Test me \",\"html_content\":\"string (optional)\",\"plain_content\":\"string (optional)\",\"generate_plain_content\":true,\"design_id\":\"483b855f-7fa9-4967-a7e1-ca05b0676fc7\",\"editor\":\"code\",\"suppression_group_id\":\"integer (optional)\",\"custom_unsubscribe_url\":\"string (optional)\",\"sender_id\":\"integer (optional)\",\"ip_pool\":\"string (optional)\"}}"
  // }
  //
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

    //      directus.auth.login({ email: DIRECTUS_LOGIN, password: DIRECTUS_PWD }).then( authresp => {
    //              console.log(authresp);
    //             directus.items('test').read(body.item).then(response => {
    //               console.log(response);
    //               console.log(response.data);
    //               console.log(response.data.title);
    //               console.log(response.data.content);
    //
    //               if(event.queryStringParameters.sgapikey == DIRECTUS_SG_API_KEY && response.data.apikey == DIRECTUS_COLLECTION_API_KEY && activesend == true )
    //               {
    //                 const subject = response.data.title;
    //                 const message = response.data.content;
    //                 console.log(subject);
    //                 console.log(message);
    //                 console.log(DIRECTUS_SG_API_KEY);
    //
    //                 client.setApiKey(SENDGRID_API_KEY);
    //
    //                 const request = {
    //       method: 'GET',
    //       url: '/v3/marketing/lists'
    //     };
    //
    //     client.request(request)
    //     .then(([response, body]) => {
    //       console.log(response.statusCode);
    //       console.log(body);
    //     })
    //                 // sendEmail(
    //                 //   client,
    //                 //   subject,
    //                 //   message,
    //                 //   SENDGRID_SENDER_EMAIL,
    //                 //   SENDGRID_SENDER_NAME
    //                 // )
    //                 // .then(response => callback(null, { statusCode: response.statusCode }))
    //                 // .catch(err => callback(err, null))
    //               }
    //
    //
    //             });
    //         });


  // }


}
