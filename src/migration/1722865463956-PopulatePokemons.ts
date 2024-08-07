import { MigrationInterface, QueryRunner } from "typeorm";
import { Pokemon } from "../pokemon/pokemon.entity/pokemon.entity";

export class PopulatePokemons1722865463956 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "pokemon" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                "attack" integer NOT NULL,
                "defense" integer NOT NULL,
                "hp" integer NOT NULL,
                "speed" integer NOT NULL,
                "type" varchar NOT NULL,
                "imageUrl" varchar NOT NULL
            )
        `);

        const pokemons = [
            {
                id: "pokemon-1",
                name: "Pikachu",
                attack: 4,
                defense: 3,
                hp: 3,
                speed: 6,
                type: "Type",
                imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
            },
            {
                id: "pokemon-2",
                name: "Charmander",
                attack: 4,
                defense: 3,
                hp: 3,
                speed: 4,
                type: "Type",
                imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png"
            },
            {
                id: "pokemon-3",
                name: "Squirtle",
                attack: 3,
                defense: 4,
                hp: 3,
                speed: 3,
                type: "Type",
                imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png"
            },
            {
                id: "pokemon-4",
                name: "Bulbasaur",
                attack: 4,
                defense: 3,
                hp: 3,
                speed: 3,
                type: "Type",
                imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png"
            },
            {
                id: "pokemon-5",
                name: "Eevee",
                attack: 4,
                defense: 3,
                hp: 4,
                speed: 5,
                type: "Type",
                imageUrl: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png"
            }
        ];

        await queryRunner.manager.getRepository(Pokemon).save(pokemons);

        // Crear la tabla battle si no existe
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "battle" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                "pokemon1Id" VARCHAR NOT NULL,
                "pokemon2Id" VARCHAR NOT NULL,
                "winnerId" VARCHAR NOT NULL,
                "winnerName" VARCHAR(255)
            )
        `);

        // Agregar la columna winnerName si la tabla battle ya existe
        const hasColumn = await queryRunner.query(`
            SELECT COUNT(*)
            FROM pragma_table_info('battle')
            WHERE name = 'winnerName'
        `);

        if (hasColumn[0]['COUNT(*)'] === 0) {
            await queryRunner.query(`
                ALTER TABLE battle ADD COLUMN winnerName VARCHAR(255)
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(Pokemon).clear();

        await queryRunner.query(`
            DROP TABLE IF EXISTS "battle"
        `);
    }
}

