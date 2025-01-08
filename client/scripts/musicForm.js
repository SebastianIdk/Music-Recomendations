document.getElementById("save").addEventListener("click", async function () {
  const nombre = document.getElementById("nombre").value;
  const artista = document.getElementById("artista").value;
  const url = document.getElementById("url").value;

  if (!nombre.trim() || !artista.trim() || !url.trim()) {
    Swal.fire({
      title: "Campos incompletos",
      text: "Por favor completa todos los campos.",
      icon: "warning",
      confirmButtonText: "Aceptar",
      background: "#1f1f1f",
      color: "#ffffff",
      iconColor: "#e28913",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
        cancelButton: "dark-cancel-button",
      },
    });
    return;
  }

  const youtubePattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/;
  if (!youtubePattern.test(url)) {
    Swal.fire({
      title: "URL inválida",
      text: "Por favor ingresa una URL válida de YouTube.",
      icon: "error",
      confirmButtonText: "Aceptar",
      background: "#1f1f1f",
      color: "#ffffff",
      iconColor: "#e28913",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
        cancelButton: "dark-cancel-button",
      },
    });
    document.getElementById("nombre").value = "";
    document.getElementById("artista").value = "";
    document.getElementById("url").value = "";
    return;
  }

  const data = {
    nombre,
    artista,
    url,
  };

  try {
    const response = await fetch("http://localhost:3000/canciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Éxito",
        text: "Se ha guardado la canción correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "#1f1f1f",
        color: "#ffffff",
        iconColor: "#e28913",
        customClass: {
          popup: "dark-popup",
          confirmButton: "dark-confirm-button",
          cancelButton: "dark-cancel-button",
        },
      }).then(() => {
        document.getElementById("nombre").value = "";
        document.getElementById("artista").value = "";
        document.getElementById("url").value = "";
        window.location.href = "./songList.html";
      });
    } else {
      Swal.fire({
        title: "Error",
        text: result.message,
        icon: "error",
        confirmButtonText: "Aceptar",
        background: "#1f1f1f",
        color: "#ffffff",
        iconColor: "#e28913",
        customClass: {
          popup: "dark-popup",
          confirmButton: "dark-confirm-button",
          cancelButton: "dark-cancel-button",
        },
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Hubo un problema con la solicitud",
      icon: "error",
      confirmButtonText: "Aceptar",
      background: "#1f1f1f",
      color: "#ffffff",
      iconColor: "#e28913",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
        cancelButton: "dark-cancel-button",
      },
    });
    document.getElementById("nombre").value = "";
    document.getElementById("artista").value = "";
    document.getElementById("url").value = "";
  }
});
