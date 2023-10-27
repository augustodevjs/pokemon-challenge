using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Pokemon.Domain.Contracts;

namespace Pokemon.Infraestructure.Extensions
{
    public static class ModelBuilderExtension
    {
        // Configura a chave primária para a propriedade 'Id' de tipo int em entidades que implementam a interface IEntity.
        public static void ApplyEntityConfiguration(this ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.GetEntities<IEntity>();
            var props = entities.SelectMany(c => c.GetProperties()).ToList();

            foreach (var property in props.Where(c => c.ClrType == typeof(int) && c.Name == "Id"))
            {
                property.IsKey();
            }
        }

        // Retorna uma lista de entidades que implementam uma interface específica no modelo do Entity Framework.
        private static List<IMutableEntityType> GetEntities<T>(this ModelBuilder modelBuilder)
        {
            var entities = modelBuilder.Model.GetEntityTypes()
                .Where(c => c.ClrType.GetInterface(typeof(T).Name) != null).ToList();

            return entities;
        }
    }
}