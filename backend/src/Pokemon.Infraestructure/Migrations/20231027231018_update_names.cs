using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pokemon.Infraestructure.Migrations
{
    /// <inheritdoc />
    public partial class update_names : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_PokemonTipos_PokemonTypeId",
                table: "Pokemons");

            migrationBuilder.RenameColumn(
                name: "PokemonTypeId",
                table: "Pokemons",
                newName: "PokemonTipoId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Pokemons",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Pokemons",
                newName: "ImagemUrl");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Pokemons",
                newName: "Descricao");

            migrationBuilder.RenameIndex(
                name: "IX_Pokemons_PokemonTypeId",
                table: "Pokemons",
                newName: "IX_Pokemons_PokemonTipoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_PokemonTipos_PokemonTipoId",
                table: "Pokemons",
                column: "PokemonTipoId",
                principalTable: "PokemonTipos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pokemons_PokemonTipos_PokemonTipoId",
                table: "Pokemons");

            migrationBuilder.RenameColumn(
                name: "PokemonTipoId",
                table: "Pokemons",
                newName: "PokemonTypeId");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Pokemons",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ImagemUrl",
                table: "Pokemons",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Pokemons",
                newName: "Description");

            migrationBuilder.RenameIndex(
                name: "IX_Pokemons_PokemonTipoId",
                table: "Pokemons",
                newName: "IX_Pokemons_PokemonTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pokemons_PokemonTipos_PokemonTypeId",
                table: "Pokemons",
                column: "PokemonTypeId",
                principalTable: "PokemonTipos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
