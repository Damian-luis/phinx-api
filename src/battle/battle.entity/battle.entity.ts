// src/battle/battle.entity/battle.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemon1Id: string;

  @Column()
  pokemon2Id: string;

  @Column()
  winnerId: string;

  @Column()
  winnerName: string;

  @Column('json')
  turns: {
    attacker: string | null;
    defender: string | null;
    damage: number;
    attackerRemainingHp: number;
    defenderRemainingHp: number;
  }[];
}
