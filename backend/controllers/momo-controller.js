import crypto from 'crypto'
import open from 'open'
import https from https

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const ipnUrl = "https://callback.url/notify";
const requestType = "captureWallet"
const extraData = ""; //pass empty value if your merchant does not have stores

export const pay = async (req,res,next) => {
    const {userId, authorId, authorName, amount} = req.body

    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const redirectUrl = `https://localhost:2022/api/user/${userId}/subscribe/${authorId}`;

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`
    const signature = crypto.createHmac('sha256', secretkey)
                            .update(rawSignature)
                            .digest('hex');

    const orderInfo = `Subscribe to ${authorName} with MoMo`;

    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
        lang: 'en'
    });

    //Create the HTTPS objects
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    const req = https.request(options, res => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            const payUrl = JSON.parse(body).payUrl
            open(payUrl);
        });

        res.on('end', () => {
            console.log('No more data in response.');
        });
        
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });

        req.write(requestBody);
        req.end();
    })
}