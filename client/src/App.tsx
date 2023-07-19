import "@app/styles/global.css"

export const App: React.FC = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Side-Stacker</h1>
        <input
          type="text"
          placeholder="Enter your username"
          className="input input-bordered input-primary w-full max-w-xs my-6"
        />
        <button className="btn btn-success">Get Started</button>
      </div>
    </div>
  </div>
)
