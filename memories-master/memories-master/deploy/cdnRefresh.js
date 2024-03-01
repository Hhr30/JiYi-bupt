// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const CdnClient = tencentcloud.cdn.v20180606.Client;
require('dotenv').config();
// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
// 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
const clientConfig = {
    credential: {
        secretId: process.env.secretId,
        secretKey: process.env.secretKey,
    },
    region: "",
    profile: {
        httpProfile: {
            endpoint: "cdn.tencentcloudapi.com",
        },
    },
};

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new CdnClient(clientConfig);
const params = {
    "Paths": [
        "https://www.ichrecorder.com/js/",
        "https://www.ichrecorder.com/img/",
        "https://www.ichrecorder.com/css/",
        "https://www.ichrecorder.com/fonts/",
        "https://www.ichrecorder.com/"
    ],
    "FlushType": "flush"
};
client.PurgePathCache(params).then(
    (data) => {
        console.log(data);
    },
    (err) => {
        console.error("error", err);
    }
);
