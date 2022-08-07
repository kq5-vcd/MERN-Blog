import crypto from 'crypto'
import open from 'open'
import https from 'https'

const partnerCode = "MOMO";
const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const requestType = "captureWallet"
const extraData = ""; //pass empty value if your merchant does not have stores

export const pay = async (req,res,next) => {
    const {userId, authorId, authorName, amount} = req.body

    const orderInfo = `Subscribe to ${authorName} with MoMo`;

    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const redirectUrl = `http://localhost:2022/api/user/${userId}/subscribe/${authorId}`;
    const ipnUrl = `http://localhost:2022/api/momo/result`

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`
    const signature = crypto.createHmac('sha256', secretkey)
                            .update(rawSignature)
                            .digest('hex');

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

    const request = https.request(options, res => {
        //console.log(`Status: ${res.statusCode}`);
        //console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');

        let response = ""
        
        res.on('data', (body) => {
            response += body
        });

        res.on('end', async() => {
            const payUrl = await JSON.parse(response).payUrl
            open(payUrl);
        });
    })
        
    request.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    request.write(requestBody);
    request.end();

    return res.status(201).json({message:"You can now close this tab"})
}

export const result = async(req, res, next) => {
    console.log("result: " + req)
}