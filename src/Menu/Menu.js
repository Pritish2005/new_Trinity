import React, { Component } from 'react';
import './Menu.css';
import * as AppGeneral from '../socialcalc/AppGeneral';
import { File, Local } from '../storage/LocalStorage.js';
import { DATA } from '../app-data.js';
import Login from '../Login/Login';
// import express from "express";
// import ptp from "pdf-to-printer";
// import fs from "fs";
// import path from "path";


// import { EmailComposer } from '@ionic-enterprise/email-composer/ngx';

// this.emailComposer.isAvailable().then((available: boolean) =>{
// if(available) {
//   //Now we know we can send
// }
// });

// let email = {
//  to: 'pritishmahajan12@gmail.com',

//  attachments: [
//    'file:../src/send.html',
//    'res://icon.png',
//    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
//    'file://README.pdf'
//  ],
//  subject: 'Cordova Icons',
//  body: 'How are you? Nice greetings from Leipzig',
//  isHtml: true
// }

// Send a text message using default options
// this.emailComposer.open(email);


// import AWS from 'aws-sdk';
// import config from '../config';

const AWS=require("aws-sdk")

const s3 = new AWS.S3({
//   apiVersion: '2010-12-01',
	  accessKeyId: 'AKIA3YLI37VDOG3VMPBK',
	  secretAccessKey: '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',
	  region: "us-east-1",
	});


// const BUCKET_NAME="Trinity_STORE001";
// const params ={Bucket:BUCKET_NAME}





// BUCKET
// Load the SDK for JavaScript
// var AWS = require('aws-sdk');
// Set the Region 
// AWS.config.update({region: 'us-east-1'});




class Menu extends Component {

	constructor(props){
		super(props);
		this.store = new Local(this.props.file);
		this.state = { login : false , openLogin: false };	
	}

	doPrint(){
		const content = AppGeneral.getCurrentHTMLContent();
		var printWindow = window.open('','','left=100,top=100');
		printWindow.document.write(content);
		printWindow.print();
		printWindow.close();
		// 	const app = express();
		// const port = 3000;

		// app.post('', express.raw({ type: 'application/pdf' }), async(req, res) => {
		
		//     const options = {};
		//     if (req.query.printer) {
		//         options.printer = req.query.printer;
		//     }
		//     const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);
		
		//     fs.writeFileSync(tmpFilePath, req.body, 'binary');
		//     await ptp.print(tmpFilePath, options);
		//     fs.unlinkSync(tmpFilePath);
		
		//     res.status(204);
		//     res.send();
		// });

		// app.listen(port, () => {
		//     console.log(`PDF Printing Service listening on port ${port}`)
		// });
			}

	doSave(){
		if(this.props.file === "default"){
			window.alert(`Cannot update ${this.props.file} file! `);
			return;
		}
		const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
		const data = this.store._getFile(this.props.file);
		const file = new File(data.created, new Date().toString(), content, this.props.file);
		this.store._saveFile(file);
		this.props.updateSelectedFile(this.props.file);
		window.alert(`File ${this.props.file} updated successfully! `);
		s3.createBucket({
			Bucket: 'trinitybucket1234'
		  },(error,success)=> {
			if (error) {
			  console.log("Error", error);
			  } else {
			  console.log("Success", success);
			  }
		  })
	}

	doSaveAs(){
		event.preventDefault();
		const filename = window.prompt("Enter filename : ");
	    if(filename) {
			if(this._validateName(filename)){
				// filename valid . go on save
				const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
				// console.log(content);
				const file = new File(new Date().toString(), new Date().toString(), content, filename);
				// const data = { created: file.created, modified: file.modified, content: file.content, password: file.password };
				// console.log(JSON.stringify(data));
				this.store._saveFile(file);
				this.props.updateSelectedFile(filename);
				window.alert(`File ${filename} saved successfully! `);
			}
			else{
				window.alert(`Filename cannot be ${this.props.file}`);

			}
			
		}
		
	}


	newFile(){
		if(this.props.file !== 'default'){
			const content = encodeURIComponent(AppGeneral.getSpreadsheetContent());
			const data = this.store._getFile(this.props.file);
			const file = new File(data.created, new Date().toString(), content, this.props.file);
			this.store._saveFile(file);
			this.props.updateSelectedFile(this.props.file);
		}
		const msc = DATA['home'][AppGeneral.getDeviceType()]['msc'];
		AppGeneral.viewFile('default', JSON.stringify(msc));
		this.props.updateSelectedFile('default');
	}

	auth(loggedIn){
		if(loggedIn){
			// console.log("log out..");
			this.setState({login: false , openLogin: false});
		}
		else{
			// console.log("log in..");
			this.setState({login: true , openLogin: true });
		}
	}

	sendEmail(){
		// Prepare values to send with email
      const emailParams = {
        Destination: { ToAddresses: [ '<aspiringuserapps@gmail.com>' ] },
        Message: {
          Body: { Text: {
            Data: 'This is a test email' } },
          Subject: { Data: 'Contact Form' }
        },
        ReplyToAddresses: [''],
        Source: '<aspiring.investments@gmail.com>', // this has to be verified email in SES
      };

    //   ses.sendEmail(emailParams, function(error, data) {
    //     if (error) {
    //        // handle error
    //     } else {
    //        // handle success
    //        alert("Done");
    //     }
    //   }
	//   );
	}

	render() {
		return (
			<div className="Menu">
				<button onClick={() => this.doSave()} > Save  </button>
				<button id="createbucket" onClick={() => this.doSaveAs()
				} > Save As </button>
				<button onClick={() => this.doPrint()} > Print </button>
				<button onClick={() => this.sendEmail()} > Email </button>
				<button onClick={() => this.newFile()} > New File </button>
				<button onClick={() => this.auth(this.state.login)} > {this.state.login ? `Logout` : `Login` } </button>
				{ this.state.openLogin ? <Login /> : null  }
			</div>
		);
	}

	/* Utility functions */
	_validateName(filename){

		filename = filename.trim();
		if(filename === "default" || filename === "Untitled"){
			// return 'Cannot update default file!';
			return false;
		}
		else if(filename === '' || !filename){
			// this.showToast('Filename cannot be empty');
			return false;
		}
		else if(filename.length > 30) {
			// this.showToast('Filename too long');
			return false;
		}
		else if(/^[a-zA-Z0-9- ]*$/.test(filename) === false) {
			// this.showToast('Special Characters cannot be used');
			return false;
		}
		return true;
	}

	_formatString(filename){
		/* Remove whitespaces */
		while(filename.indexOf(" ") !== -1){
			filename = filename.replace(" ","");
		}
		return filename;
	}

}

const button=document.getElementById('createbucket');
// button.onClick=()=>{
// 	// const createBucket = createBucket('../SES_createbucket.js');

// 	// createBucket();
// }


export default Menu;