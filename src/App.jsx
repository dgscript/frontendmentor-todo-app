import { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Note from "./components/Note";
import Options from "./components/Options";

function App() {
  /* true: light, false: dark */
  const [currentTheme, setCurrentTheme] = useState(false);
  const [notesFilter, setNotesFilter] = useState("all");
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowSize(window.innerWidth);
  });

  const [newNote, setNewNote] = useState({
    content: "",
    complete: false,
    id: 0,
  });

  const [notes, setNotes] = useState([
    { content: "Complete online JavaScript course", complete: true, id: 1 },
    { content: "Jog around the park 3x", complete: false, id: 2 },
    { content: "10 minutes meditation", complete: false, id: 3 },
    { content: "Read for 1 hour", complete: false, id: 4 },
    { content: "Pick up groceries", complete: false, id: 5 },
    { content: "Complete Todo App on Frontend Mentor", complete: false, id: 6 },
  ]);
  const [displayNotes, setDisplayNotes] = useState(notes);

  function changeTheme() {
    if (currentTheme) {
      document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
    } else {
      document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
    }
  }

  useEffect(() => {
    setDisplayNotes(notes);
    filterNotes();
  }, [notes]);

  useEffect(() => {
    changeTheme();
  }, [currentTheme]);

  useEffect(() => {
    filterNotes();
  }, [notesFilter]);

  function deleteNote(noteId) {
    setNotes((prev) => {
      return prev.filter((note) => note.id !== noteId);
    });
  }
  function removeAllCompleted() {
    setNotes((prev) => {
      return prev.filter((note) => note.complete === false);
    });
  }
  function changeCompleteNote(noteId) {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note.id === noteId) {
          return { ...note, complete: !note.complete };
        }
        return note;
      });
    });
  }
  function filterNotes() {
    let mapped = notes.filter((note) => {
      if (notesFilter === "active") {
        return note.complete === false;
      } else if (notesFilter === "completed") {
        return note.complete === true;
      } else {
        return note;
      }
    });
    setDisplayNotes(mapped);
  }

  const indexSwap = useRef({ start: null, end: null });

  function reorderNotes(start, end) {
    let currentNotes = [...notes];
    [currentNotes[start], currentNotes[end]] = [
      currentNotes[end],
      currentNotes[start],
    ];
    setNotes(currentNotes);
  }

  return (
    <>
      <img
        src={
          currentTheme
            ? windowSize > 768
              ? "./bg-desktop-light.jpg"
              : "./bg-mobile-light.jpg"
            : windowSize > 768
            ? "./bg-desktop-dark.jpg"
            : "./bg-mobile-dark.jpg"
        }
        alt="background"
        className="absolute top-0 left-0 w-full -z-10"
      />
      <main className="mx-auto max-w-xl h-dvh max-md:px-7 max-[321px]:px-5!">
        <Header
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          setNewNote={setNewNote}
          newNote={newNote}
          setNotes={setNotes}
          notes={notes}
        />

        <div
          id="notes-container"
          className={`relative w-full rounded-[0.3rem] shadow-[0px_15px_30px_#00000020] first:rounded-t-[0.3rem] ${
            currentTheme ? "bg-white" : "bg-navy-900"
          }`}
        >
          <div
            id="notes-wrapper"
            className={`max-h-[22rem] overflow-y-scroll  ${
              notes.length === 0
                ? "min-h-[20rem] flex items-center justify-center"
                : ""
            }`}
          >
            {notes.length === 0 && (
              <p className="text-purple-600 text-[1.2rem] max-md:text-[0.9rem]">
                No tasks yet. Add one to get started!
              </p>
            )}

            {displayNotes.map((note) => (
              <Note
                key={note.id}
                currentTheme={currentTheme}
                noteContent={note.content}
                noteComplete={note.complete}
                deleteNote={deleteNote}
                changeCompleteNote={changeCompleteNote}
                noteId={note.id}
                notes={notes}
                reorderNotes={reorderNotes}
                indexSwap={indexSwap}
              />
            ))}
          </div>

          <Options
            currentTheme={currentTheme}
            setNotesFilter={setNotesFilter}
            notesFilter={notesFilter}
            removeAllCompleted={removeAllCompleted}
            notes={notes}
          />
        </div>

        <p
          id="drag-drop-msg"
          className="text-purple-600 font-semibold my-10 text-center text-[0.9rem] select-none max-md:mt-25 pb-10"
        >
          Drag and drop to reorder list
        </p>
      </main>
    </>
  );
}

export default App;
