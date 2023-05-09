import "./NoPage.css";

function NoPage() {
  return (
    <div className="nopage">
      <main>
        <div class="container">
          <div class="nopage-row">
            <h1>404</h1>
            <h2>UH OH! You're lost.</h2>
            <p style={{whiteSpace:'pre-line', textAlign:'center'}}>
              The page you are looking for does not exist.{"\n"} You can click the button below to go back to the homepage.
            </p>
            <a href="/" class="btn1 green">HOME</a>
          </div>
        </div>
      </main>
    </div>
  );
}
export default NoPage;
