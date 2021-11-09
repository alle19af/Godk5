//https://www.youtube.com/watch?v=USrMdBF0zcg
const express = require('express');
const https =require('https');
const path = require('path');
const fs = require('fs');

const server = express();

server.use('/', (req,res, next) => {
    res.send('Hello from ssl server');
});


//Now we will create an SSL server
const sslServer = https.createServer({
    // appl. should not start before - which is why we use readfileSync
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, server);

sslServer.listen(3443, () => console.log('Secure server on port 3443'));
//server.listen(8000, () => {});

// openssl.org
    // Steps for SSL cert generation
        // 1. Generate private key (an create key.pem file)
            // command: openssl genrsa -out key.pem
        // 2. Create a CSR (Certificate signing request) using private key
            // command: openssl req -new -key key.pem -out csr.pem
        // 3. GEnerate the SSL certification from CSR ( a stanadard: x509 defining the format of the public key)
            // command : openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
