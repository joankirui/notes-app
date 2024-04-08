const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
        )
        if(data.length === 0){
            localStorage.removeItem("notes")
        } else {
            localStorage.setItem("notes", JSON.stringify(data))
        }
}
addBtn.addEventListener("click",
function() {
    addNote()
})


const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;
    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove();
            saveNotes(); 
        }
    )  // ensures that deleted notes are removed from localStorage
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes();
        }
    ) // saves notes 
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes();
        }
    ) // saves note after you typed a text in the text area and left the text area without hitting save . Upon refreshing the same message will not be deleted

    main.appendChild(note);
    saveNotes(); // saves empty notes("") on localStorage
}

// IIFE(Immediately Invoked Function Expression) this part runs immediately after the script loads
(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote() // if there are no notes on localStorage display an empty note
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote) // if there are notes on localStorage display them
                }
            )
        }
    }
)()