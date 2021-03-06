
import { LoginError } from 'config/errors/error.types';
import BaseQueryBuilder from 'models/Base.queries';
import { Model, Page } from 'objection';
import { Credentials } from 'types/input';
import User from './User';

export default class UserQueryBuilder<M extends Model, R = M[]>
  extends BaseQueryBuilder<M, R> {

  // These are necessary.
  ArrayQueryBuilderType!: UserQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: UserQueryBuilder<M, M>;
  NumberQueryBuilderType!: UserQueryBuilder<M, number>;
  PageQueryBuilderType!: UserQueryBuilder<M, Page<M>>;

  async findByCredentials({ email, password }: Credentials): Promise<User> {

    try {

      // Find the appropriate user from a the sent credentials (including email and password)
      const user = (await this.findOne('email', email)) as unknown as User;

      // If no user is found throw login error
      if (!user) {

        throw new LoginError();

      }

      // Eslint disable needed until objection-password add types, verifyPassword does exist on User
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const authenticated = await user.verifyPassword!(password);

      // If the password could not be validated throw login error
      if (!authenticated) {

        throw new LoginError();

      }

      return user;

    } catch {

      throw new LoginError();

    }

  }

}
