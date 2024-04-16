import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "30ffaf92352fb6308f9915c6026616a5",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Ops. Filme não encontrado!")
                    navigate("/", { replace: true });
                    return;
                })
        }
        loadFilme();
    }, [navigate, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if (hasFilme) {
            toast.warn("Este filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes do filme...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="noreferrer noopener" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}> Trailer </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;