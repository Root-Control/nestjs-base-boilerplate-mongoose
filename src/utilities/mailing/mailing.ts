import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { resolve } from 'path';

import { replaceAll } from '../helpers/replacer.helper';
import { MAILING_EMAIL, MAILING_PASSWORD } from '../../server.constants';

export interface MailOptions {
	to: any;
	multipleRecipients: boolean;
	subject: string;
	templateName?: string;
	replacements?: object;
};

/**
 *  Template list and path
 */
const templateList = {
	invitation: 'src/utilities/mailing/templates/invitation.template.html',
	passwordReset: 'src/utilities/mailing/templates/password-reset.template.html',
	accountVerification: 'src/utilities/mailing/templates/account-verification.template.html',
};
/**
 *  Send Email Service
 */
const sendEmail = (options: MailOptions) => {
	let html: string = '';
	const isArray = typeof options.to === 'object' ||  options.multipleRecipients;
	if (options.templateName) {
		try {
			const templateHtml = fs.readFileSync(resolve(options.templateName), 'utf8');
			html = replaceAll(templateHtml, options.replacements);
		} catch (ex) {
			console.log(ex);
		}
	}

	return new Promise(async (resolve: Function, reject: Function) => {
	    // Generate test SMTP service account from ethereal.email
	    try {
		    let transporter = nodemailer.createTransport({
		        service: 'GMAIL',
		        tls: { rejectUnauthorized: false },
		        auth: {
		            user: MAILING_EMAIL,
		            pass: MAILING_PASSWORD
		        }
		    });

		    // send mail with defined transport object
		    let info = await transporter.sendMail({
		        from: '"Seasonal Employment Support" <noreply@seasonal-employment.com>', // sender address
		        to: isArray ? options.to.join(',') : options.to,
		        subject: options.subject, // Subject line
		        html
		    });
		    resolve();	    	
	    } catch (ex) {
	    	reject();
	    }

	});
};

export {
    sendEmail,
    templateList
};