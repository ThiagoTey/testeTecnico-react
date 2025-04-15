import { useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await fetch("https://api.github.com/users/thiagotey");

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
          />
          <button
            onClick={() => searchProfile()}
            className="w-[62px] h-[62px] bg-[#005CFF] flex items-center justify-center rounded-[10px] absolute right-0 border border-white cursor-pointer"
          >
            <img src="/search.svg" alt="search-icon" />
          </button>
        </div>

        <div className="bg-[#D9D9D9]  w-[804px] rounded-[25px] min-h-[88px] p-5 flex items-center gap-[32px]">
          {/* Profile Picture */}
          <div className="rounded-full border-[#005CFF] border-2 w-[220px] h-[220px] overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={userData.avatar_url}
              alt="profile-picture"
            />
          </div>

          {/* Dados usuário */}
          <div>
            <h2 className="text-[#005CFF] text-xl font-bold">{userData.name}</h2>
            <p className="text-black text-[15px] mt-4">
              {userData.bio ? userData.bio : "Nada especificado..."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
