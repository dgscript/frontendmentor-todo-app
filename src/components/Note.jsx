import { useEffect, useRef } from "react";

export default function Note({
  currentTheme,
  noteContent,
  noteComplete,
  deleteNote,
  changeCompleteNote,
  noteId,
  notes,
  reorderNotes,
  indexSwap,
}) {
  const noteRef = useRef();

  return (
    <div
      ref={noteRef}
      onDragStart={() => {
        indexSwap.current.start = notes.findIndex((note) => note.id === noteId);
      }}
      onDragEnter={() => {
        indexSwap.current.end = notes.findIndex((note) => note.id === noteId);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        noteRef.current.classList.add("opacity-20");
      }}
      onDragLeave={() => {
        noteRef.current.classList.remove("opacity-20");
      }}
      onDrop={() => {
        noteRef.current.classList.remove("opacity-20");
        reorderNotes(indexSwap.current.start, indexSwap.current.end);
      }}
      draggable="true"
      className={`${
        currentTheme
          ? "bg-white border-gray-300"
          : "bg-navy-900 border-purple-800"
      } py-4 flex items-center hover:*:opacity-100 border-b-2 *:transition note active:opacity-90 transition-opacity`}
    >
      <div
        className={`checkbox-container ${currentTheme && "lightmode-checkbox"}`}
      >
        <input
          onChange={() => {
            changeCompleteNote(noteId);
          }}
          checked={noteComplete && "true"}
          type="checkbox"
          className={currentTheme && "lightmode-checkbox"}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path
            fill="none"
            stroke="#FFF"
            stroke-width="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </div>
      <p
        className={`text-[1.1rem] w-[85%] max-md:text-[0.8rem] ${
          currentTheme ? "text-navy-850" : "text-white"
        } ${noteComplete && "line-through"} ${
          noteComplete && currentTheme && "!text-gray-300"
        } ${noteComplete && !currentTheme && "!text-purple-600"}`}
      >
        {noteContent}
      </p>

      {/* delete button */}
      <button
        onClick={() => {
          deleteNote(noteId);
        }}
        className="mx-5 opacity-0 max-md:opacity-100 transition cursor-pointer"
      >
        <svg
          className="max-md:w-4 max-md:h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <path
            fill="#494C6B"
            fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
}
