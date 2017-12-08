'use strict';

module.exports = ({Crypto, env} = params) => {
    return {
        notFoundResponse: (res, status = 404, error = {}, message = 'Not Found', title = 'Not Found') => {
            res.status(status);
            return res.render('error.html', {error, message, title});
        },
        textEncryption: (value) => {
            return Crypto.AES.encrypt(value, env.APP_ENCRYPT_KEY);
        },
        textDecryption: (encryptedValue) => {
            let bytes = Crypto.AES.decrypt(encryptedValue.toString(), env.APP_ENCRYPT_KEY);
            return bytes.toString(Crypto.enc.Utf8);
        },
        objectEncryption: (data) => {
            return Crypto.AES.encrypt(JSON.stringify(data), env.APP_ENCRYPT_KEY);
        },
        decryptToObject: (encryptedValue) => {
            let bytes = Crypto.AES.decrypt(encryptedValue.toString(), env.APP_ENCRYPT_KEY);
            return JSON.parse(bytes.toString(Crypto.enc.Utf8));
        },
    }
}