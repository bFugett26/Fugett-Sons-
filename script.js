(function () {
  const typeSelect = document.getElementById("serviceType");
  const residentialGroup = document.getElementById("residentialGroup");
  const residentialSelect = document.getElementById("residentialType");
  const exteriorGroup = document.getElementById("exteriorGroup");
  const interiorGroup = document.getElementById("interiorGroup");
  const interiorSelect = document.getElementById("interiorType");
  const roomSqftGroup = document.getElementById("roomSqftGroup");
  const form = document.getElementById("estimateForm");
  const thankYouNotice = document.getElementById("thankYouNotice");

  if (!typeSelect || !form) {
    return;
  }

  function resetSubgroups() {
    exteriorGroup.classList.add("hidden");
    interiorGroup.classList.add("hidden");
    roomSqftGroup.classList.add("hidden");
  }

  function handleServiceType() {
    const isResidential = typeSelect.value === "Residential";
    residentialGroup.classList.toggle("hidden", !isResidential);

    if (!isResidential) {
      residentialSelect.value = "";
      interiorSelect.value = "";
      resetSubgroups();
    }
  }

  function handleResidentialType() {
    resetSubgroups();

    if (residentialSelect.value === "Exterior") {
      exteriorGroup.classList.remove("hidden");
    }

    if (residentialSelect.value === "Interior") {
      interiorGroup.classList.remove("hidden");
    }
  }

  function handleInteriorType() {
    const showRoomSqft = interiorSelect.value === "Room";
    roomSqftGroup.classList.toggle("hidden", !showRoomSqft);
  }

  typeSelect.addEventListener("change", handleServiceType);
  residentialSelect.addEventListener("change", handleResidentialType);
  interiorSelect.addEventListener("change", handleInteriorType);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    thankYouNotice.classList.remove("hidden");
    form.reset();
    resetSubgroups();
    residentialGroup.classList.add("hidden");
  });
})();
