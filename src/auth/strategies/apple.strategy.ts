import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-apple';

@Injectable()
export class AppleOAuthStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      callbackURL: 'http://localhost:3000/auth/apple/callback',
      scope: ['name', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, idToken: any, profile: any, done: VerifyCallback): Promise<any> {
    const user = {
      email: idToken.email,
      fullName: profile ? profile.fullName : null,
      accessToken,
    };
    done(null, user);
  }
}
