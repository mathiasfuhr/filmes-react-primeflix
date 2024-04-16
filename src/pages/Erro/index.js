import { Link } from "react-router-dom";
import './erro.css';
function Erro() {
    return (
        <div className="not-found">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página não encontrada</h2>
        <Link to='/' className="not-found-link">Veja todos Filmes</Link>
      </div>
      );
}

export default Erro;