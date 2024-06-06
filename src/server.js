
import * as OTPAuth from "otpauth";
import express from "express";
import QRCode from "qrcode";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 3008


app.get('/generate',(req,res) => {
    try {
        let totp = new OTPAuth.TOTP({
            issuer: "Gui",
            label: "GuiTest",
            algorithm: "SHA1",
            digits: 6,
            period: 15,
            secret: "UDB2QN5L67YPP46DQUAI3XPN5UTVV5IK", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
        });
        
        console.log("totp",totp);
        
        let uri = OTPAuth.URI.stringify(totp);

        let secret = new OTPAuth.Secret({ size: 20 });
        console.log("secret",secret.base32);

        QRCode.toDataURL(uri,(err, url) => {
            if(err) console.log("erro",err);
            console.log(url)
        })
        res.send('Hello')
        
    } catch (error) {
        console.log(error);
    }
})

app.post('/validate',(req,res) => {
    try {
        console.log(req.body);
        let totp = new OTPAuth.TOTP({
            issuer: "Gui",
            label: "GuiTest",
            algorithm: "SHA1",
            digits: 6,
            period: 15,
            secret: "UDB2QN5L67YPP46DQUAI3XPN5UTVV5IK", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
        });

        // let totp = new OTPAuth.TOTP({
        //     issuer: "GuiIssue",
        //     label: "GuiLabel",
        //     algorithm: "SHA1",
        //     digits: 6,
        //     period: 30,
        //     secret: "FWFW4FE3EDQCD", // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
        // });
        
        let token = totp.generate(15);
        
        console.log("tokenCERTO:",token);

        let mytoken = String(req.body.token);
        let delta = totp.validate({token: mytoken});
        
        console.log("delta",delta);
        
        res.send('Hello')
        
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
})