import { useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [search, setSearch] = useState("");

  const searchProfile = async () => {
    try {
      setIsLoading(true);
      setUserData(null);
      setError(null);
      setImageLoaded(false)
      const data = await fetch(`https://api.github.com/users/${search}`);

      if (!data.ok) {
        throw new Error(`Erro: ${data.status}`);
      }

      const dadosJson = await data.json();
      setUserData(dadosJson);

      console.log(userData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-full max-w-[1156px] h-[537px] m-auto bg-black flex flex-col gap-8 pt-10 items-center text-white">
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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            onClick={() => searchProfile()}
            disabled={isLoading}
            className="w-[62px] h-[62px] bg-[#005CFF] flex items-center justify-center rounded-[10px] absolute right-0 border border-white cursor-pointer disabled:bg-gray-600"
          >
            <img src="/search.svg" alt="search-icon" />
          </button>
        </div>

        <div className={`bg-[#D9D9D9]  w-[804px] rounded-[25px] min-h-[88px] p-5 flex items-center gap-[32px]  ${error || isLoading || userData ? "visible" : "invisible"}`}>
          {isLoading && (
            <div className="m-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}

          {userData && (
            <>
              {/* Profile Picture */}
              <div className="rounded-full border-[#005CFF] border-2 w-full h-[220px] max-w-[220px] max-h-[220px] overflow-hidden">
                <img
                  onLoad={() => setImageLoaded(true)}
                  className={`object-cover w-full h-full block ${!imageLoaded && "blur-3xl bg-gray-400"}`}
                  src={userData.avatar_url}
                  alt="profile-picture"
                />
              </div>

              {/* Dados usuário */}
              <div>
                <h2 className="text-[#005CFF] text-xl font-bold">
                  {userData.name}
                </h2>
                <p className="text-black text-[15px] mt-4">
                  {userData.bio ? userData.bio : "Bio : Nada especificado..."}
                </p>
              </div>
            </>
          )}

          {error && (
            <p className="text-[#FF0000] text-xl m-auto text-center w-full max-w-[500px]">
              Nenhum perfil foi encontrado com ese nome de usuário. Tente
              novamente
            </p>
          )}
        </div>
      </div>

      {/* Gradientes do fundo */}
      <div className="radial-gradient absolute w-[888px] h-[888px] left-1/2 top-[-300px] translate-x-[200px]" />

      <div className="radial-gradient w-[674px] h-[674px] left-1/2 bottom-0 translate-x-[-1200px]"/>

      <img className="absolute left-1/2 translate-x-[-650px] translate-y-[-260px] -z-10" src="/pontos.png" alt="design-fundo"/>
    </section>
  );
}

export default App;
