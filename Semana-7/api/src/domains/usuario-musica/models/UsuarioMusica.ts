import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/Index';
import { Musica } from '../../musicas/models/Musica';
import { Usuario } from '../../usuarios/models/Usuario';

interface UsuarioMusicaInterface extends Model<InferAttributes<UsuarioMusicaInterface>, InferCreationAttributes<UsuarioMusicaInterface>> {
    id: CreationOptional<string>;
    idUsuario: string;
    idMusica: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export const UsuarioMusica = sequelize.define<UsuarioMusicaInterface>('UsuarioMusica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    idMusica: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Musica,
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Musica.belongsToMany(Usuario, { through: UsuarioMusica });
Usuario.belongsToMany(Musica, { through: UsuarioMusica });
Musica.hasMany(UsuarioMusica);
UsuarioMusica.belongsTo(Musica);
Usuario.hasMany(UsuarioMusica);
UsuarioMusica.belongsTo(Usuario);

UsuarioMusica.sync({ alter: false, force: false})
    .then(() => {
        console.log('Tabela de UsuárioMusica foi (re)criada!');
    })
    .catch((err) => console.log(err));