import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}
    
    async sendEmail (to: string, subject: string, body: string): Promise<void> {
        try {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: 'zeeshan20@gmail.com',
                  pass: 'tlftnytyubuizusq'
                  //'nzciicrnlwcailbs' 
                }
            
            // const transporter = new nodemailer.createTransport({
            //     host: this.configService.get<string>('SMTP_HOST'),
            //     port: this.configService.get<number>('SMTP_PORT'),
            //     auth: {
            //         user: this.configService.get<string>('SMTP_USER'),
            //         pass: this.configService.get<string>('SMTP_PASS'),
            // },
        });
            const result = await transporter.sendMail({
                from: 'zeeshan20@gmail.com',
                to,
                subject: subject,
                html: body
        });
        } catch (error) {
            console.log(error);
            return error;
        }
    };
}    