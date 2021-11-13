import { useState } from "react";
import axios from 'axios';
import { executeRequest } from "../services/api";
import { NextPage } from "next";
import { CadastroUsuarioProps} from "../types/CadastroUsuarioProps";

/* eslint-disable @next/next/no-img-element */
type DadosUsuarioProps = {
  showModal(): void
}


const CadastroUsuario: NextPage<DadosUsuarioProps> = ({
    showModal
}) => {

    return (
        <div className="container-cadastro">
            <button onClick={showModal}><img  src="/add.svg" alt="Cadastre-se"/> Cadastre-se</button>          
        </div>
    );
}

export { CadastroUsuario }