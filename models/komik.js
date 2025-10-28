module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define('Komik', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    penulis: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Komik',
    timestamps: true,       // ✅ aktifkan createdAt & updatedAt
    freezeTableName: true   // biar nama tabel tetap "Komik", tidak dijamak jadi "Komiks"
  });

  return Komik;
};
