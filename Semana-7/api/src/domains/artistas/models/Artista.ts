import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/Index';

export interface ArtistaInterface extends Model<InferAttributes<ArtistaInterface>, InferCreationAttributes<ArtistaInterface>> {
  id: CreationOptional<string>;
  nome: string;
  nacionalidade: string;
  foto: string; 
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export const Artista = sequelize.define<ArtistaInterface>('Artista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nacionalidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
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

Artista.sync({alter: false, force: false})
    .then(() => {
        console.log('Tabela de Artistas foi (re)criada.');
    })
    .catch((err) => console.log(err));
