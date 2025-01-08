document.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await fetch("http://localhost:3000/canciones");
    if (!response.ok) {
      console.error("Error al obtener canciones:", response.status);
      return;
    }

    let canciones = await response.json();
    let container = document.getElementById("songsContainer");
    container.innerHTML = "";

    canciones.forEach((cancion) => {
      let songItem = document.createElement("div");
      songItem.classList.add("song-item");

      let infoDiv = document.createElement("div");
      infoDiv.classList.add("song-info");

      let textDiv = document.createElement("div");
      textDiv.classList.add("song-text");

      let songName = document.createElement("h2");
      songName.textContent = cancion.nombre;

      let songArtist = document.createElement("p");
      songArtist.textContent = cancion.artista;

      textDiv.appendChild(songName);
      textDiv.appendChild(songArtist);

      let voteSection = document.createElement("div");
      voteSection.classList.add("vote-section");

      let btnUpvote = document.createElement("button");
      btnUpvote.classList.add("vote-button", "upvote");
      let upvoteIcon = document.createElement("img");
      upvoteIcon.src = "./images/like.png";
      upvoteIcon.alt = "pulgar arriba";
      btnUpvote.appendChild(upvoteIcon);

      btnUpvote.addEventListener("click", async () => {
        try {
          let upResp = await fetch(
            `http://localhost:3000/canciones/${cancion._id}/meGusta`,
            {
              method: "PATCH",
            }
          );
          if (upResp.ok) {
            let data = await upResp.json();
            if (data && data.votos !== undefined) {
              voteCountContainer.querySelector(".vote-count").textContent =
                data.votos;
            } else {
              console.error("Respuesta inesperada del servidor:", data);
            }
          } else {
            console.error("Error al votar positivo");
          }
        } catch (error) {
          console.error("Error de conexión:", error);
        }
      });

      let btnDownvote = document.createElement("button");
      btnDownvote.classList.add("vote-button", "downvote");
      let downvoteIcon = document.createElement("img");
      downvoteIcon.src = "./images/dislike.png";
      downvoteIcon.alt = "pulgar abajo";
      btnDownvote.appendChild(downvoteIcon);

      btnDownvote.addEventListener("click", async () => {
        try {
          let downResp = await fetch(
            `http://localhost:3000/canciones/${cancion._id}/noMeGusta`,
            {
              method: "PATCH",
            }
          );
          if (downResp.ok) {
            let data = await downResp.json();
            if (data && data.votos !== undefined) {
              voteCountContainer.querySelector(".vote-count").textContent =
                data.votos;
            } else {
              console.error("Respuesta inesperada del servidor:", data);
            }
          } else {
            console.error("Error al votar negativo");
          }
        } catch (error) {
          console.error("Error de conexión:", error);
        }
      });

      voteSection.appendChild(btnUpvote);
      voteSection.appendChild(btnDownvote);

      let voteCountContainer = document.createElement("div");
      voteCountContainer.classList.add("vote-count-container");
      voteCountContainer.innerHTML = `<strong>Votos:</strong> <span class="vote-count">${cancion.votos}</span>`;

      let iconsContainer = document.createElement("div");
      iconsContainer.classList.add("icons-container");

      let youtubeLink = document.createElement("a");
      youtubeLink.classList.add("youtube-link");
      youtubeLink.href = "#";
      youtubeLink.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarModalYoutube(cancion.url);
      });

      let youtubeIcon = document.createElement("img");
      youtubeIcon.src = "./images/youtube.png";
      youtubeIcon.alt = "Ver en YouTube";
      youtubeLink.appendChild(youtubeIcon);

      let deleteIcon = document.createElement("img");
      deleteIcon.src = "./images/delete.png";
      deleteIcon.alt = "Eliminar canción";
      deleteIcon.classList.add("delete-icon");

      deleteIcon.addEventListener("click", () => {
        mostrarPopupEliminar(cancion);
      });

      iconsContainer.appendChild(youtubeLink);
      iconsContainer.appendChild(deleteIcon);

      infoDiv.appendChild(textDiv);
      infoDiv.appendChild(voteSection);
      infoDiv.appendChild(voteCountContainer);
      infoDiv.appendChild(iconsContainer);

      songItem.appendChild(infoDiv);

      container.appendChild(songItem);
    });
  } catch (error) {
    console.error("Error de conexión:", error);
  }
});

function mostrarPopupEliminar(cancion) {
  Swal.fire({
    title: "¿Seguro que deseas eliminar la canción?",
    text: `${cancion.nombre} - ${cancion.artista}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
    background: "#1f1f1f",
    color: "#ffffff",
    iconColor: "#e28913",
    customClass: {
      popup: "dark-popup",
      confirmButton: "dark-confirm-button",
      cancelButton: "dark-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarCancion(cancion._id);
    }
  });
}

async function eliminarCancion(id) {
  try {
    let response = await fetch(`http://localhost:3000/canciones/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      Swal.fire({
        title: "Eliminada",
        text: "La canción ha sido eliminada.",
        icon: "success",
        background: "#1f1f1f",
        color: "#ffffff",
        iconColor: "#e28913",
        customClass: {
          popup: "dark-popup",
          confirmButton: "dark-confirm-button",
        },
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar la canción.",
        icon: "error",
        background: "#1f1f1f",
        color: "#ffffff",
        iconColor: "#e28913",
        customClass: {
          popup: "dark-popup",
          confirmButton: "dark-confirm-button",
        },
      });
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al eliminar la canción.",
      icon: "error",
      background: "#1f1f1f",
      color: "#ffffff",
      iconColor: "#e28913",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
      },
    });
  }
}

function mostrarModalYoutube(url) {
  let modal = document.getElementById("popupOverlay");
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div class="popup-content">
      <span class="close-btn">&times;</span>
      <iframe width="560" height="315" src="${url.replace(
        "watch?v=",
        "embed/"
      )}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;

  let closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.innerHTML = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.innerHTML = "";
    }
  });

  modal.classList.remove("hidden");
}
