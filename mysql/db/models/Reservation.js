//Reservations.js
import { DataTypes } from "sequelize";
import { defineModel } from "../../controllers/defineModels.js";

const Reservation = defineModel('Reservation', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });


  export default Reservation;