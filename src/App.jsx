import "./App.css";

function App() {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-full max-w-[1156px] h-[537px] m-auto bg-black flex flex-col items-center text-white">
        <header className="flex gap-3 items-center">
          <img src="/githubIcon.png" alt="github-Icon" />
          <span className="text-6xl">Perfil</span>
          <img
            className="w-[160px] h-[45px]"
            src="/githubTitle.png"
            alt="github-title"
          />
        </header>

        <div className="w-[500px] flex relative">
          <input
            className="bg-white text-black placeholder:text-black w-full h-[62px] rounded-[10px] pl-4 text-xl"
            type="text"
            placeholder="Digite um usuário do github"
          />
          <button
            onClick={() => {}}
            className="w-[62px] h-[62px] bg-[#005CFF] flex items-center justify-center rounded-[10px] absolute right-0 border border-white cursor-pointer"
          >
            <img src="/search.svg" alt="search-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
