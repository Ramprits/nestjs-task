import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'jfsdgjhfgsdjfgsdjhlfgsdjhfgshdjlkfgldshjk',
        });
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;
        const user = this.userRepository.findOne({ username });
        console.log(user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
