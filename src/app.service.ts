import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AppService {

  constructor(private readonly firebaseService: FirebaseService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async file(file: any, body: any) {

    const url = await this.firebaseService.uploadImage(file)

    return {
      "uploaded image": url,
      "body": body
    }

  }

}
