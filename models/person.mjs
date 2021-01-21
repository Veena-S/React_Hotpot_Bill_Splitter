export default function personModel(sequelize, DataTypes) {
  return sequelize.define('person', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    name: {
      type: DataTypes.STRING,
    },
    bill_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'bills',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
