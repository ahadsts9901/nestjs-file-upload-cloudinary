import { Injectable } from "@nestjs/common";
import admin from "firebase-admin";
import "dotenv/config";

@Injectable()
export class FirebaseService {

    public bucket: any

    constructor() {

        const serviceAccount: any = {
            type: process.env.FIREBASE_STORAGE_TYPE,
            project_id: process.env.FIREBASE_STORAGE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_STORAGE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_STORAGE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace '\n' with actual line breaks
            client_email: process.env.FIREBASE_STORAGE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_STORAGE_CLIENT_ID,
            auth_uri: process.env.FIREBASE_STORAGE_AUTH_URI,
            token_uri: process.env.FIREBASE_STORAGE_HART_URI,
            auth_provider_x509_cert_url: process.env.FIREBASE_STORAGE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.FIREBASE_STORAGE_CLIENT_X509_CERT_URL,
            universe_domain: process.env.FIREBASE_STORAGE_UNIVERSE_DOMAIN,
        };

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        this.bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);

    }

    uploadImage(file: any) {
        
        return new Promise((resolve, reject) => {
            this.bucket.upload(
                file.path,
                {
                    // give destination name
                    destination: `images/${file.filename}`,
                },
                function (err: any, file: {
                    getSignedUrl: (arg0: {
                        action: string; expires: string; // file expiry time
                    }) => { (): any; new(): any; then: { (arg0: (urlData: any, err: any) => Promise<void>): void; new(): any; }; };
                }, apiResponse: any) {
                    if (!err) {

                        // get signed url
                        file.getSignedUrl({

                            action: 'read',
                            expires: '04-12-2123' // file expiry time

                        }).then(async (urlData, err) => {

                            if (!err) {
                                // console.log("url: ", urlData[0]) // here your uploaded image url
                                resolve(urlData[0])
                            }
                        })
                    } else {
                        reject(err)
                    }
                }
            );
        })
    }

}
