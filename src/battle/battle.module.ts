import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleController } from './battle.controller';
import { Battle } from './battle.entity/battle.entity';
import { PokemonModule } from '../pokemon/pokemon.module';
import { BattleService } from './battle.service';
@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonModule],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}

