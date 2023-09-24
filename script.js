let notes = [
    { id: 1, title: "Note 1", tagline: "Tagline 1", body: "Body 1"},
    { id: 2, title: "Note 2", tagline: "Tagline 2", body: "Body 2"},
];


const notesPerPage = 6;
let currentPage = 1;

function updatePagination() {
  const totalPages = Math.ceil(notes.length / notesPerPage);
  const pageNum = document.getElementById("page-num");

  if (totalPages <= 1) {
    pageNum.textContent = "";
    document.getElementById("prev-page").disabled = true;
    document.getElementById("next-page").disabled = true;
  } else {
    pageNum.textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-page").disabled = (currentPage === 1);
    document.getElementById("next-page").disabled = (currentPage === totalPages);
  }
}

function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  const displayedNotes = notes.slice(startIndex, endIndex);

  displayedNotes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = `
      <h3 class="dtitle">${note.title}</h3>
      <hr>
      <p class="dtag">${note.tagline}</p>
      <p class="dbody">${note.body}</p>
    `;
    notesList.appendChild(noteDiv);
  });

  updatePagination();
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayNotes();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  const totalPages = Math.ceil(notes.length / notesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayNotes();
  }
});



function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.display = "block";
    
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000); 
}


function addNote() {
    const title = document.getElementById("note-title").value;
    const tagline = document.getElementById("note-tagline").value;
    const body = document.getElementById("note-body").value;
    
    if (!title || !tagline || !body) {
        showToast("Please fill in all fields.");
        return;
    }
    
    const newNoteId = notes.length + 1;
    const newNote = { id: newNoteId, title, tagline, body};
    
    notes.push(newNote);

    document.getElementById("note-title").value = "";
    document.getElementById("note-tagline").value = "";
    document.getElementById("note-body").value = "";
    
    displayNotes();
}


displayNotes();