module.exports = (sequelize, Sequelize) => {
  const Dataset = sequelize.define("dataset", {
    name: {
      type: Sequelize.STRING,
    },
    istrained: {
      type: Sequelize.BOOLEAN,
    },
    lessonId: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT,
    },
    title: {
      type: Sequelize.STRING,
    },
  });

  return Dataset;
};
