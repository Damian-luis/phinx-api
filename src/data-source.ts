import { DataSource } from 'typeorm';
import { Pokemon } from './pokemon/pokemon.entity/pokemon.entity';
import { Battle } from './battle/battle.entity/battle.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Pokemon, Battle],
    migrations: [__dirname + '/migration/*.ts'], // Note the .ts extension for TypeScript files
    synchronize: false,
});



