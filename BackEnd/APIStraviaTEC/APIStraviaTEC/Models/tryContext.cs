using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace APIStraviaTEC.Models
{
    public partial class tryContext : DbContext
    {
        public tryContext()
        {
        }

        public tryContext(DbContextOptions<tryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Prueba> Prueba { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UsePostgreSql("host=localhost;database=try;user id=postgres; port=5433; password=admin");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Prueba>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Prueba", "public");

                entity.HasIndex(e => e.Id)
                    .HasName("Prueba_pkey");

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("id")
                    .HasColumnType("char");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
