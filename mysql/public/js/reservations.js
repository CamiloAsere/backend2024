import { fetchData } from "./utils.js";

// reservations.js
function editReservation(id) {
  fetchData(`/admin/editReservation/${id}`)
    .then(data => {
      document.getElementById('reservationForm').action = `/admin/reservations/${id}`;
      document.getElementById('reservationUserId').value = data.userId;
      document.getElementById('reservationProductId').value = data.productId;
      document.getElementById('reservationDate').value = data.date;
      document.getElementById('formButton').textContent = "Actualizar reservación";
    })
    .catch(error => {
      console.log("error waos ",error)
    });
}

function resetForm() {
  document.getElementById('reservationForm').action = "/admin/reservations";
  document.getElementById('reservationUserId').value = "";
  document.getElementById('reservationProductId').value = "";
  document.getElementById('reservationDate').value = "";
  document.getElementById('formButton').textContent = "Agregar reservación";
}

// Exponer la función al objeto global window
window.editReservation = editReservation;
window.resetForm = resetForm;
