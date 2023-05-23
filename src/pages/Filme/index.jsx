import { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import api from '../../services/api';
import './filme-info.css'
import { useNavigate, useParams } from "react-router-dom";

function Filme() {
    const { id } = useParams();
    const navigation = useNavigate()
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadingFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "e92c7cbae32dcf32369d3984e0119b90",
                    language: "pt-BR"
                }
            })
                .then(response => {
                    setFilme(response.data)
                    setLoading(false)
                }).catch(() => {
                    navigation("/", {replace: true});
                    return
                });

        }

        loadingFilme()
    }, [id, navigation]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if(hasFilme){
            toast.warn("Ops... Já está adicionado na sua lista.")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Adicionado a sua lista")
    }


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
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
                <button onClick={() => salvarFilme()}>Salvar</button>
                <button>
                    <a rel="external" target="_blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );

}

export default Filme;