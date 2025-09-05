import { useRef, useState, useEffect } from "react";

export default function Header({
  currentTheme,
  setCurrentTheme,
  setNewNote,
  newNote,
  setNotes,
  notes,
}) {
  const headerInput = useRef();
  const headerSend = useRef();
  const [headerCheckbox, setHeaderCheckbox] = useState(false);

  return (
    <div className="w-full mb-7 max-md:mt-3 *:transition">
      <div className="flex justify-between items-center my-7">
        <h1 className="select-none text-[2.5rem] max-md:text-[1.8rem] font-bold text-white tracking-[1rem] max-md:tracking-[0.7rem]">
          TODO
        </h1>
        <button
          onClick={() => {
            setCurrentTheme(!currentTheme);
          }}
          className="w-10 h-10 grid items-center justify-center cursor-pointer"
        >
          {currentTheme ? (
            <svg
              className="max-md:w-6 max-md:h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
              width="26"
              height="26"
            >
              <path
                fill="#FFF"
                fill-rule="evenodd"
                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
              />
            </svg>
          ) : (
            <svg
              className="max-md:w-6 max-md:h-6"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
            >
              <path
                fill="#FFF"
                fill-rule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`${
          currentTheme ? "bg-white" : "bg-navy-900"
        } py-4 rounded-[0.3rem] flex items-center shadow-[0px_15px_15px_#00000020]`}
      >
        <div
          ref={headerSend}
          className={`checkbox-container checkbox-header ${
            currentTheme && "lightmode-checkbox"
          }`}
        >
          <input
            checked={headerCheckbox}
            type="checkbox"
            className={`${currentTheme && "lightmode-checkbox"}`}
            onClick={() => {
              if (newNote.content !== "") {
                setNotes([...notes, newNote]);
                headerInput.current.value = "";
                const notesWrapper = document.getElementById("notes-wrapper");
                setTimeout(() => {
                  notesWrapper.scrollTo({
                    top: notesWrapper.scrollHeight,
                    behavior: "smooth",
                  });
                }, 100);
                headerSend.current.style.opacity = "0";
                setHeaderCheckbox(true);
                setTimeout(() => {
                  setHeaderCheckbox(false);
                  headerSend.current.style.opacity = "1";
                }, 1000);
                setNewNote({
                  content: "",
                  complete: false,
                  id: null,
                });
              }
            }}
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
        <input
          ref={headerInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newNote.content !== "") {
              setNotes([...notes, newNote]);
              e.target.value = "";
              const notesWrapper = document.getElementById("notes-wrapper");
              setTimeout(() => {
                notesWrapper.scrollTo({
                  top: notesWrapper.scrollHeight,
                  behavior: "smooth",
                });
              }, 100);
              setNewNote({
                content: "",
                complete: false,
                id: null,
              });
            }
          }}
          onChange={(e) => {
            setNewNote({
              content: e.target.value.trim(),
              complete: false,
              id: Date.now(),
            });
          }}
          type="text"
          placeholder="Create a new todo..."
          className={`placeholder:text-purple-600 max-md:text-[0.8rem] placeholder:font-medium text-[1.1rem] focus:outline-none w-[85%] ${
            currentTheme ? "text-navy-900" : "text-white"
          } `}
        />
      </div>
    </div>
  );
}
