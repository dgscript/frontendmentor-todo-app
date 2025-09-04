export default function Options({
  currentTheme,
  setNotesFilter,
  notesFilter,
  removeAllCompleted,
  notes,
}) {
  return (
    <div
      className={`${
        currentTheme
          ? "bg-white border-gray-300"
          : "bg-navy-900 border-purple-800"
      } py-4 rounded-b-[0.3rem] grid grid-cols-3 max-md:grid-cols-2 hover:*:opacity-100 px-5 border-t-2`}
    >
      <p className="text-purple-600 text-[1rem] max-md:text-[0.8rem] select-none justify-self-start">
        {notes.filter((note) => note.complete === false).length} items left
      </p>

      <div
        className={`*:text-purple-600 flex gap-4 items-center *:hover:cursor-pointer ${
          currentTheme
            ? "*:hover:text-navy-950 max-md:bg-white"
            : "*:hover:text-purple-100 max-md:bg-navy-900"
        } *:transition justify-self-center max-md:absolute max-md:bottom-[-65px]  max-md:w-full max-md:flex max-md:items-center max-md:justify-center max-md:p-3 max-md:rounded-[0.3rem] max-md:shadow-[0px_15px_15px_#00000010]`}
      >
        <button
          className={notesFilter === "all" && "!text-blue-500"}
          onClick={() => {
            setNotesFilter("all");
          }}
        >
          All
        </button>
        <button
          className={notesFilter === "active" && "!text-blue-500"}
          onClick={() => {
            setNotesFilter("active");
          }}
        >
          Active
        </button>
        <button
          className={notesFilter === "completed" && "!text-blue-500"}
          onClick={() => {
            setNotesFilter("completed");
          }}
        >
          Completed
        </button>
      </div>

      <button
        onClick={() => {
          removeAllCompleted();
        }}
        className={`text-purple-600 hover:cursor-pointer ${
          currentTheme ? "hover:text-navy-950" : "hover:text-purple-100"
        } transition justify-self-end max-md:text-[0.8rem]`}
      >
        Clear Completed
      </button>
    </div>
  );
}
