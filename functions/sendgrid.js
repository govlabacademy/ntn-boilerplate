const directusclient = require('@directus/sdk-js');



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

  // console.log(event);
  // console.log(context);
  // console.log(callback);
  // console.log(event.body);

const contentdata =
	{	"news":[{"article":"First News Story","image":"https://marketing-image-production.s3.amazonaws.com/uploads/d13f90f1285040cd12f86d57ab9e61fee852def9f17e9d65c7a875b213c0fc414235679aa4016327adad5e78758cd9d131db32da4385e226d43fe01cfcd273eb.png","text":"Tadaa Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt elementum sem non luctus. Ut dolor nisl, facilisis non magna quis, elementum ultricies tortor. In mattis, purus ut tincidunt egestas, ligula nulla accumsan justo, vitae bibendum orci ligula id ipsum. Nunc elementum tincidunt libero, in ullamcorper magna volutpat a.","c2a_link":"","c2a_button":"Read the Story"
	}
	,{
		"article":"Second News Story","image":"https://marketing-image-production.s3.amazonaws.com/uploads/d13f90f1285040cd12f86d57ab9e61fee852def9f17e9d65c7a875b213c0fc414235679aa4016327adad5e78758cd9d131db32da4385e226d43fe01cfcd273eb.png","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt elementum sem non luctus. Ut dolor nisl, facilisis non magna quis, elementum ultricies tortor. In mattis, purus ut tincidunt egestas, ligula nulla accumsan justo, vitae bibendum orci ligula id ipsum. Nunc elementum tincidunt libero, in ullamcorper magna volutpat a.","c2a_link":"","c2a_button":"Read Story"
	}
	,{
		"article":"Third News Story","image":"https://marketing-image-production.s3.amazonaws.com/uploads/d13f90f1285040cd12f86d57ab9e61fee852def9f17e9d65c7a875b213c0fc414235679aa4016327adad5e78758cd9d131db32da4385e226d43fe01cfcd273eb.png","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt elementum sem non luctus. Ut dolor nisl, facilisis non magna quis, elementum ultricies tortor. In mattis, purus ut tincidunt egestas, ligula nulla accumsan justo, vitae bibendum orci ligula id ipsum. Nunc elementum tincidunt libero, in ullamcorper magna volutpat a.","c2a_link":"","c2a_button":"Read Story"}]
	};

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

			const sgMail = require('@sendgrid/mail');
      const client = require('@sendgrid/client');
client.setApiKey(SENDGRID_API_KEY);
// const request = {
//   method: 'POST',
//   url: '/v3/marketing/singlesends',
//   body: "{\"name\":\"By Stephan\",\"status\":\"scheduled\",\"send_at\":\"2020-12-30T16:38:18Z\",\"sender_id\":\"1274375\",\"send_to\":{\"list_ids\":[\"beb02da9-d59c-4875-8ea7-1797d3a7eb9e\"]},\"email_config\":{\"generate_plain_content\":true,\"design_id\":\"30a18e13-1454-4db5-8217-9676ddd875b4\",\"design_id\":\"30a18e13-1454-4db5-8217-9676ddd875b4\"}}"
// };

const requestcount = {
  method: 'GET',
  url: '/v3/contactdb/lists/beb02da9-d59c-4875-8ea7-1797d3a7eb9e/recipients'
  // body: "{\"name\":\"By Stephan\",\"status\":\"scheduled\",\"send_at\":\"2020-12-28T19:48:18Z\",\"sender_id\":\"1274375\",\"send_to\":{\"list_ids\":[\"beb02da9-d59c-4875-8ea7-1797d3a7eb9e\"]},\"email_config\":{\"generate_plain_content\":true,\"design_id\":\"30a18e13-1454-4db5-8217-9676ddd875b4\"}}"
};
client.request(requestcount)
.then(([response, body]) => {
  console.log(response.statusCode);
   console.log(response.body);

})
//
// const request = {
//   method: 'GET',
//   url: '/v3/marketing/lists/beb02da9-d59c-4875-8ea7-1797d3a7eb9e?contact_sample=true'
//   // body: "{\"name\":\"By Stephan\",\"status\":\"scheduled\",\"send_at\":\"2020-12-28T19:48:18Z\",\"sender_id\":\"1274375\",\"send_to\":{\"list_ids\":[\"beb02da9-d59c-4875-8ea7-1797d3a7eb9e\"]},\"email_config\":{\"generate_plain_content\":true,\"design_id\":\"30a18e13-1454-4db5-8217-9676ddd875b4\"}}"
// };
//
//
// client.request(request)
// .then(([response2, body2]) => {
//
//   console.log(response2.statusCode);
// 	console.log(response2);
//   console.log(body);
//
//   // const request2 = {
//   //   method: 'PATCH',
//   //   url: '/v3/marketing/singlesends/30a18e13-1454-4db5-8217-9676ddd875b4/schedule',
//   //   body: "{\"send_at\":\"2020-12-28T19:48:18Z\"}"
//   // };
// 	//
//   //   client.request(request2)
//   //   .then(([response2, body2]) => {
//   //     console.log(response2.statusCode);
//   //     console.log(response2.body);
//   //   })
//
//
// })


// sgMail.setApiKey(SENDGRID_API_KEY);
// const msg = {
//   to: ['schmid91@gmail.com', 'stephan@thegovlab.org'],
//   from: 'admins@thegovlab.org',
//   subject: 'Hello world',
// 	sendAt: 1609340115,
//   // text: 'Hello plain world!',
//   // html: '<p>Hello HTML world!</p>',
// 	dynamic_template_data: contentdata,
// 	templateId: 'd-e40c2f0007664c7aac6a8097d9a25300'
// };
// sgMail.sendMultiple(msg).then(response => {
//       console.log(response.statusCode);
//       console.log(response);
//     })
// 		.catch(error => {
//     // Log friendly error
//     console.error(error);
//
//     if (error.response) {
//       // Extract error msg
//       const {message, code, response} = error;
//
//       // Extract response msg
//       const {headers, body} = response;
//
//       console.error(body);
//     }
//   });




// const request = {
//   method: 'PUT',
//   url: '/v3/marketing/singlesends/483b855f-7fa9-4967-a7e1-ca05b0676fc7/schedule',
//   body: "{\"send_at\":\"2020-12-23T22:17:18Z\"}"
// };
//
//   client.request(request)
//   .then(([response, body]) => {
//     console.log(response.statusCode);
//     console.log(response.body);
//   })


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
