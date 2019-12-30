const rq = require('request-promise');
const uuid = require('uuid/v4');
const readLineSync = require('readline-sync');


const idGame = {
    footbal: 1858843294435923,
    basketball: 1555255427859932
};

let accessToken = readLineSync.question('Access Token : ');
let score = readLineSync.question('Point : ');
let thread_id = readLineSync.question('ThreadID : ');
let game = readLineSync.keyInSelect(Object.keys(idGame), 'Option : ');

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-FB-Friendly-Name': 'InstantGameAddScore',
    'Host': ' graph.facebook.com',
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; Google Build/PD1A.180720.031) [FBAN/Orca-Android;FBAV/242.0.0.15.119;FBPN/com.facebook.orca;FBLC/en_US;FBBV/184324664;FBCR/Android;FBMF/unknown;FBBD/Android;FBDV/Google;FBSV/9;FBCA/x86:null;FBDM/{density=2.625,width=1080,height=1794};FB_FW/1;]',
    'X-FB-Net-HNI': 310260,
    'X-FB-SIM-HNI': 310270,
    'Authorization': 'OAuth ' + accessToken,
    'X-FB-Connection-Type': 'WIFI',
    'X-FB-HTTP-Engine': 'Liger',
    'Connection': 'close'
};

const variables = {
    input: {
        thread_id,
        session_id: uuid(),
        send_admin: true,
        score,
        game_id: Object.values(idGame)[game],
        client_mutation_id: uuid(),
        actor_id: ""
    }
};

const formData = {
    doc_id: '3366131746738159',
    method: 'post',
    locale: 'en_US',
    pretty: 'false',
    format: 'json',
    variables: JSON.stringify(variables),
    fb_api_req_friendly_name: 'InstantGameAddScore',
    fb_api_caller_class: 'graphservice',
    fb_api_analytics_tags: ["GraphServices","nav_attribution_id={}","visitation_id=null"],
    server_timestamps: true,
};

const options = {
    uri: 'https://graph.facebook.com/graphql',
    method: 'post',
    form: formData,
    headers: headers,
    json: true
};



rq(options)
    .then(response => {
        if (typeof response.error != undefined){
            console.log('Suucess');
        }
    })
    .catch(err => {
        console.log(err);
    });

