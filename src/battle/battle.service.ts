import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Battle } from './battle.entity/battle.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from '../pokemon/pokemon.entity/pokemon.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private battleRepository: Repository<Battle>,
    private pokemonService: PokemonService,
  ) {}

  async battle(pokemon1Id: string, pokemon2Id: string): Promise<Battle> {
    const pokemon1 = await this.pokemonService.findOne(pokemon1Id);
    const pokemon2 = await this.pokemonService.findOne(pokemon2Id);

    const turns = [];

    let firstAttacker = pokemon1.speed > pokemon2.speed ? pokemon1 : pokemon2;
    let secondAttacker = firstAttacker === pokemon1 ? pokemon2 : pokemon1;

    if (pokemon1.speed === pokemon2.speed) {
      firstAttacker = pokemon1.attack > pokemon2.attack ? pokemon1 : pokemon2;
      secondAttacker = firstAttacker === pokemon1 ? pokemon2 : pokemon1;
    }

    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      const damage1 = Math.max(firstAttacker.attack - secondAttacker.defense, 1);
      pokemon2.hp -= damage1;

      turns.push({
        attacker: firstAttacker.name,
        defender: secondAttacker.name,
        damage: damage1,
        attackerRemainingHp: firstAttacker.hp,
        defenderRemainingHp: pokemon2.hp,
      });

      if (pokemon2.hp <= 0) break;

      const damage2 = Math.max(secondAttacker.attack - firstAttacker.defense, 1);
      pokemon1.hp -= damage2;

      turns.push({
        attacker: secondAttacker.name,
        defender: firstAttacker.name,
        damage: damage2,
        attackerRemainingHp: secondAttacker.hp,
        defenderRemainingHp: pokemon1.hp,
      });

      if (pokemon1.hp <= 0) break;
    }

    const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;

    const battle = new Battle();
    battle.pokemon1Id = pokemon1Id;
    battle.pokemon2Id = pokemon2Id;
    battle.winnerId = winner.id;
    battle.winnerName = winner.name;
    battle.turns = turns;

    return this.battleRepository.save(battle);
  }
}
