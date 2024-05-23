import { Sequelize, DataTypes, UUID, UUIDV4 } from 'sequelize';
require('dotenv').config();

// Variáveis de ambiente
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } = process.env;

// Configurações de conexão com o banco de dados
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  dialectModule: require('mysql2'),
});

// Definição do modelo Task
const Task = sequelize.define('Task', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  id_user: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'task',
  timestamps: true,
});

export { Task, sequelize };