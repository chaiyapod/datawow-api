import { UserEntity } from '@/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Command, Positional } from 'nestjs-command';
import { Repository } from 'typeorm';

@Injectable()
export class UserCommand {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  @Command({
    command: 'seed:user <username>',
    describe: 'seed user into db',
  })
  async seed(
    @Positional({
      name: 'username',
      describe: 'the username',
      type: 'string',
    })
    username: string,
  ) {
    console.time('seed');

    const seederId = crypto.randomUUID();

    const userSeed = await this.userRepo.query(
      `INSERT INTO "user_entity"("created_at", "created_by_id", "updated_at", "updated_by_id", "deleted_at", "deleted_by_id", "id", "username", "image") VALUES (DEFAULT, $1,DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, $2, DEFAULT) RETURNING "created_at", "updated_at", "deleted_at", "id"`,
      [seederId, username],
    );

    const [user] = await this.userRepo.save(userSeed);
    console.timeLog(
      'seed',
      `seed user -> ${user.id}, ${username} successfully`,
    );
  }
}
