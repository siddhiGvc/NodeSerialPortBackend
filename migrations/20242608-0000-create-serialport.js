

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('SerialPort', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value1:{
        type: Sequelize.STRING,
      },
      value2:{
        type: Sequelize.STRING,
      },
      value3:{
        type: Sequelize.STRING,
      },
      value4:{
        type: Sequelize.STRING,
      },
      value5:{
        type: Sequelize.STRING,
      },
      value6:{
        type: Sequelize.STRING,
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('SerialPort'),
  };