import { User } from '@modules/users/models';

export interface JwtPayload {
  sub: User['id'];
  name: User['username'];
}
