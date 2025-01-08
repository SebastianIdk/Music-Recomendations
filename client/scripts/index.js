document.addEventListener("DOMContentLoaded", () => {
  let randomSongBtn = document.getElementById("randomSongBtn");
  let randomSongModal = document.getElementById("randomSongModal");
  let randomSongContainer = document.getElementById("randomSongContainer");
  let closeBtn = document.querySelector(".close-btn");
  randomSongBtn.addEventListener("click", async () => {
    try {
      let response = await fetch(
        "http://localhost:3000/canciones/cancionAleatoria"
      );
      if (!response.ok) {
        console.error("Error al obtener canción aleatoria:", response.status);
        return;
      }
      let cancion = await response.json();
      let videoId = new URL(cancion.url).searchParams.get("v");
      if (!videoId) {
        videoId = cancion.url.split("youtu.be/")[1];
      }
      randomSongContainer.innerHTML = `
        <p><strong>${cancion.nombre}</strong> - ${cancion.artista}</p>
        <div class="video-container">
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
      randomSongModal.style.display = "flex";
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  });

  closeBtn.addEventListener("click", () => {
    randomSongModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == randomSongModal) {
      randomSongModal.style.display = "none";
    }
  });
});
