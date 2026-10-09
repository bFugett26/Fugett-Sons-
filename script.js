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
    thankYouNotice.classList.remove("hidden");
    form.reset();
    resetSubgroups();
    residentialGroup.classList.add("hidden");
  });
})();

(function () {
  const galleryImages = document.querySelectorAll(".gallery-photo img");

  if (!galleryImages.length) {
    return;
  }

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Expanded project image");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close expanded image">&times;</button>
    <figure class="lightbox-figure">
      <img class="lightbox-image" alt="" />
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeButton = lightbox.querySelector(".lightbox-close");
  let lastFocusedElement;

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function openLightbox(image) {
    lastFocusedElement = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  galleryImages.forEach(function (image) {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Enlarge image: ${image.alt}`);
    image.addEventListener("click", function () {
      openLightbox(image);
    });
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
