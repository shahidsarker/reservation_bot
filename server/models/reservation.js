"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      person_name: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      phonenumber: { type: DataTypes.STRING, allowNull: false },
      raw_body: DataTypes.JSON
    },
    {}
  );
  Reservation.associate = function(models) {
    // associations can be defined here
  };
  return Reservation;
};
