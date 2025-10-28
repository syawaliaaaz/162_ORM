const { time } = require("console");

module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define('Komik', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true, 
    },
    judul: {
      type: DataTypes.STRING,
      unique: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    penulis: {
      type: DataTypes.STRING,
      allowNull: false
    },
}, {
    tableName: 'Komik',
    timestamps: false,
    freezeTableName: true   
  });
  return Komik;
};