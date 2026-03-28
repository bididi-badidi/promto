import { PromptLibrary } from "./components/PromptLibrary";

import "./App.css";

function App() {
  return (
    <div className="transparent h-full flex flex-col justify-between">
      {/* <div className="hero mb-8">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div> */}

      {/* <div className="flex flex-col lg:flex-row items-start justify-center p-0"> */}
      {/* <div className="w-full max-w-md text-left space-y-6">
            <div className="p-6 bg-social-bg border border-border rounded-xl">
              <p className="text-sm text-text/70 mb-4">
                Drag a prompt from the library on the right and drop it into this box to see it in action.
              </p>
              <textarea
                className="w-full h-32 p-3 bg-bg border border-border rounded-lg text-sm focus:ring-2 focus:ring-accent/20 focus:outline-none"
                placeholder="Drop your prompt here..."
              ></textarea>
            </div>
          </div> */}

      {/* <div className="w-full max-w-md"> */}
      <PromptLibrary />
      {/* </div> */}
      {/* </div> */}

      {/* <div className="ticks"></div> */}

      {/* <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Features</h2>
          <p>Built for productivity</p>
          <ul className="text-left mt-4 space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Nested folder organization
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Universal Drag & Drop support
            </li>
            <li className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Search and filter instantly
            </li>
          </ul>
        </div>

        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Source Code</h2>
          <p>Check out the implementation</p>
          <ul>
            <li>
              <a href="https://github.com/ZSHenChan/promto" target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section> */}

      {/* <div className="ticks"></div> */}
      {/* <section id="spacer" className="h-20"></section> */}

      {/* Compact Footer */}
      <div className="p-3 bg-gradient/10 border-t border-white/5 text-center">
        <p className="text-[10px] text-celestial-violet font-bold flex items-center justify-center gap-1.5 opacity-80 uppercase tracking-wider">
          <div className="h-1 w-1 rounded-full bg-cyber-pink animate-pulse" />
          Click a prompt to copy it
        </p>
      </div>
    </div>
  );
}

export default App;
