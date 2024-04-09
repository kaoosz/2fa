
import * as OTPAuth from "otpauth";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 3008

import QRCode from "qrcode";

app.post('/',(req,res) => {
    try {
        console.log(req.body);
        let totp = new OTPAuth.TOTP({
            issuer: "ACME",
            label: "AzureDiamond",
            algorithm: "SHA1",
            digits: 6,
            period: 60,
            secret: "NB2W45DFOIZANB2W45DFOIZA", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
        });
        
        console.log("totp",totp);
        
        // // let token = totp.generate();
        
        // // console.log("token",token);
        
        let delta = totp.validate({ token: req.body.token });
        
        console.log("delta",delta);
        
        // let uri = totp.toString();
        let uri = OTPAuth.URI.stringify(totp);
        console.log("uri",uri);

        QRCode.toDataURL(uri,(err, url) => {
            if(err) console.log("erro",err);
            console.log(url)
        })
        res.send('Hello')
        
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
})