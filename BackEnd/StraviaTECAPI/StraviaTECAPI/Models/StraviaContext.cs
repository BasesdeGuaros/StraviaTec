using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StraviaTECAPI.Models
{
    public partial class StraviaContext : DbContext
    {
        public StraviaContext()
        {
        }

        public StraviaContext(DbContextOptions<StraviaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Actividad> Actividad { get; set; }
        public virtual DbSet<ActividadClasificaDeporte> ActividadClasificaDeporte { get; set; }
        public virtual DbSet<ActividadPerteneceEvento> ActividadPerteneceEvento { get; set; }
        public virtual DbSet<Categoria> Categoria { get; set; }
        public virtual DbSet<Deporte> Deporte { get; set; }
        public virtual DbSet<Evento> Evento { get; set; }
        public virtual DbSet<EventoPatrocinadoPatrocinador> EventoPatrocinadoPatrocinador { get; set; }
        public virtual DbSet<EventoTieneTipo> EventoTieneTipo { get; set; }
        public virtual DbSet<Grupo> Grupo { get; set; }
        public virtual DbSet<ParticipacionUsuarioGrupo> ParticipacionUsuarioGrupo { get; set; }
        public virtual DbSet<Patrocinador> Patrocinador { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<Subscripciones> Subscripciones { get; set; }
        public virtual DbSet<TipoEvento> TipoEvento { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<UsuarioRol> UsuarioRol { get; set; }
        public virtual DbSet<UsuarioSigueUsuario> UsuarioSigueUsuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("host=localhost;database=Stravia;user id=postgres; port=5432; password=woopo..09ll9");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Actividad>(entity =>
            {
                entity.ToTable("actividad");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Completitud)
                    .HasColumnName("completitud")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date")
                    .HasDefaultValueSql("CURRENT_DATE");

                entity.Property(e => e.HoraInicial)
                    .HasColumnName("hora_inicial")
                    .HasColumnType("time with time zone")
                    .HasDefaultValueSql("CURRENT_TIME");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.Kilometraje)
                    .HasColumnName("kilometraje")
                    .HasDefaultValueSql("1.1");

                entity.Property(e => e.Recorrido)
                    .HasColumnName("recorrido")
                    .HasColumnType("character varying(100)");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Actividad)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("actividad_usuario_fk");
            });

            modelBuilder.Entity<ActividadClasificaDeporte>(entity =>
            {
                entity.HasKey(e => new { e.IdActividad, e.IdDeporte });

                entity.ToTable("actividad_clasifica_deporte");

                entity.Property(e => e.IdActividad).HasColumnName("id_actividad");

                entity.Property(e => e.IdDeporte).HasColumnName("id_deporte");

                entity.HasOne(d => d.IdActividadNavigation)
                    .WithMany(p => p.ActividadClasificaDeporte)
                    .HasForeignKey(d => d.IdActividad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("clasifica_actividad_fk");

                entity.HasOne(d => d.IdDeporteNavigation)
                    .WithMany(p => p.ActividadClasificaDeporte)
                    .HasForeignKey(d => d.IdDeporte)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("clasifica_deporte_fk");
            });

            modelBuilder.Entity<ActividadPerteneceEvento>(entity =>
            {
                entity.HasKey(e => new { e.IdActividad, e.IdEvento });

                entity.ToTable("actividad_pertenece_evento");

                entity.Property(e => e.IdActividad).HasColumnName("id_actividad");

                entity.Property(e => e.IdEvento).HasColumnName("id_evento");

                entity.HasOne(d => d.IdActividadNavigation)
                    .WithMany(p => p.ActividadPerteneceEvento)
                    .HasForeignKey(d => d.IdActividad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pertenece_actividad_fk");

                entity.HasOne(d => d.IdEventoNavigation)
                    .WithMany(p => p.ActividadPerteneceEvento)
                    .HasForeignKey(d => d.IdEvento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("pertenece_evento_fk");
            });

            modelBuilder.Entity<Categoria>(entity =>
            {
                entity.ToTable("categoria");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripción)
                    .HasColumnName("descripción")
                    .HasColumnType("character varying(100)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(16)");
            });

            modelBuilder.Entity<Deporte>(entity =>
            {
                entity.ToTable("deporte");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(15)");
            });

            modelBuilder.Entity<Evento>(entity =>
            {
                entity.ToTable("evento");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Categoria).HasColumnName("categoria");

                entity.Property(e => e.Costo).HasColumnName("costo");

                entity.Property(e => e.Cuenta)
                    .HasColumnName("cuenta")
                    .HasColumnType("character varying(50)");

                entity.Property(e => e.Elevación)
                    .HasColumnName("elevación")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date")
                    .HasDefaultValueSql("CURRENT_DATE");

                entity.Property(e => e.FechaFinal)
                    .HasColumnName("fecha_final")
                    .HasColumnType("date");

                entity.Property(e => e.FechaInicial)
                    .HasColumnName("fecha_inicial")
                    .HasColumnType("date");

                entity.Property(e => e.FondoAltitud).HasColumnName("fondo_altitud");

                entity.Property(e => e.Foto).HasColumnName("foto");

                entity.Property(e => e.IdAdmin).HasColumnName("id_admin");

                entity.Property(e => e.IdDeporte).HasColumnName("id_deporte");

                entity.Property(e => e.Kilometraje)
                    .HasColumnName("kilometraje")
                    .HasDefaultValueSql("1.1");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(15)");

                entity.Property(e => e.Privado)
                    .HasColumnName("privado")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Recorrido)
                    .HasColumnName("recorrido")
                    .HasColumnType("character varying(100)");

                entity.HasOne(d => d.CategoriaNavigation)
                    .WithMany(p => p.Evento)
                    .HasForeignKey(d => d.Categoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("evento_categoria_fk");

                entity.HasOne(d => d.IdAdminNavigation)
                    .WithMany(p => p.Evento)
                    .HasForeignKey(d => d.IdAdmin)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("evento_admin_fk");

                entity.HasOne(d => d.IdDeporteNavigation)
                    .WithMany(p => p.Evento)
                    .HasForeignKey(d => d.IdDeporte)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("evento_deporte_fk");
            });

            modelBuilder.Entity<EventoPatrocinadoPatrocinador>(entity =>
            {
                entity.HasKey(e => new { e.IdEvento, e.IdPatrocinador });

                entity.ToTable("evento_patrocinado_patrocinador");

                entity.Property(e => e.IdEvento).HasColumnName("id_evento");

                entity.Property(e => e.IdPatrocinador).HasColumnName("id_patrocinador");

                entity.HasOne(d => d.IdEventoNavigation)
                    .WithMany(p => p.EventoPatrocinadoPatrocinador)
                    .HasForeignKey(d => d.IdEvento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("patrocinado_evento_fk");

                entity.HasOne(d => d.IdPatrocinadorNavigation)
                    .WithMany(p => p.EventoPatrocinadoPatrocinador)
                    .HasForeignKey(d => d.IdPatrocinador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("patrocinado_patrocinador_fk");
            });

            modelBuilder.Entity<EventoTieneTipo>(entity =>
            {
                entity.HasKey(e => new { e.IdEvento, e.IdTipoEvento });

                entity.ToTable("evento_tiene_tipo");

                entity.Property(e => e.IdEvento).HasColumnName("id_evento");

                entity.Property(e => e.IdTipoEvento).HasColumnName("id_tipo_evento");

                entity.HasOne(d => d.IdEventoNavigation)
                    .WithMany(p => p.EventoTieneTipo)
                    .HasForeignKey(d => d.IdEvento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tiene_evento_fk");

                entity.HasOne(d => d.IdTipoEventoNavigation)
                    .WithMany(p => p.EventoTieneTipo)
                    .HasForeignKey(d => d.IdTipoEvento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("tiene_tipo_fk");
            });

            modelBuilder.Entity<Grupo>(entity =>
            {
                entity.ToTable("grupo");

                entity.HasIndex(e => e.Nombre)
                    .HasName("grupo_nombre_key")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(15)");
            });

            modelBuilder.Entity<ParticipacionUsuarioGrupo>(entity =>
            {
                entity.HasKey(e => new { e.IdGrupo, e.IdUsuario });

                entity.ToTable("participacion_usuario_grupo");

                entity.Property(e => e.IdGrupo).HasColumnName("id_grupo");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.Rol).HasColumnName("rol");

                entity.HasOne(d => d.IdGrupoNavigation)
                    .WithMany(p => p.ParticipacionUsuarioGrupo)
                    .HasForeignKey(d => d.IdGrupo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("participacion_grupo_fk");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.ParticipacionUsuarioGrupo)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("participacion_usuario_fk");
            });

            modelBuilder.Entity<Patrocinador>(entity =>
            {
                entity.ToTable("patrocinador");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Logo).HasColumnName("logo");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(15)");

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.Property(e => e.Representante)
                    .IsRequired()
                    .HasColumnName("representante")
                    .HasColumnType("character varying(20)");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.ToTable("rol");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(20)");
            });

            modelBuilder.Entity<Subscripciones>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdEvento });

                entity.ToTable("subscripciones");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.IdEvento).HasColumnName("id_evento");

                entity.Property(e => e.Aceptado).HasColumnName("aceptado");

                entity.HasOne(d => d.IdEventoNavigation)
                    .WithMany(p => p.Subscripciones)
                    .HasForeignKey(d => d.IdEvento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("subscripcion_evento_fk");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Subscripciones)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("subscripcion_usuario_fk");
            });

            modelBuilder.Entity<TipoEvento>(entity =>
            {
                entity.ToTable("tipo_evento");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(25)");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Cedula);

                entity.ToTable("usuario");

                entity.Property(e => e.Cedula)
                    .HasColumnName("cedula")
                    .ValueGeneratedNever();

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnName("apellido")
                    .HasColumnType("character varying(20)");

                entity.Property(e => e.Contraseña)
                    .IsRequired()
                    .HasColumnName("contraseña")
                    .HasColumnType("character varying(16)");

                entity.Property(e => e.FechaNacimiento)
                    .HasColumnName("fecha_nacimiento")
                    .HasColumnType("date");

                entity.Property(e => e.Foto).HasColumnName("foto");

                entity.Property(e => e.Nacionalidad)
                    .IsRequired()
                    .HasColumnName("nacionalidad")
                    .HasColumnType("character varying(16)");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasColumnType("character varying(10)");

                entity.Property(e => e.NombreUsuario)
                    .IsRequired()
                    .HasColumnName("nombre_usuario")
                    .HasColumnType("character varying(10)");
            });

            modelBuilder.Entity<UsuarioRol>(entity =>
            {
                entity.HasKey(e => new { e.IdUsuario, e.IdRol });

                entity.ToTable("usuario_rol");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.IdRol).HasColumnName("id_rol");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.UsuarioRol)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("usuario_rol_fk");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.UsuarioRol)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("rol_usuario_fk");
            });

            modelBuilder.Entity<UsuarioSigueUsuario>(entity =>
            {
                entity.HasKey(e => new { e.IdSeguidor, e.IdSeguido });

                entity.ToTable("usuario_sigue_usuario");

                entity.Property(e => e.IdSeguidor).HasColumnName("id_seguidor");

                entity.Property(e => e.IdSeguido).HasColumnName("id_seguido");

                entity.HasOne(d => d.IdSeguidoNavigation)
                    .WithMany(p => p.UsuarioSigueUsuarioIdSeguidoNavigation)
                    .HasForeignKey(d => d.IdSeguido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("usuario_sigue_fk");

                entity.HasOne(d => d.IdSeguidorNavigation)
                    .WithMany(p => p.UsuarioSigueUsuarioIdSeguidorNavigation)
                    .HasForeignKey(d => d.IdSeguidor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("sigue_usuario_fk");
            });
        }
    }
}
