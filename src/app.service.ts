import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const port = process.env.PORT;
    console.log(port);
    return 'Hello World!';
  }
}
