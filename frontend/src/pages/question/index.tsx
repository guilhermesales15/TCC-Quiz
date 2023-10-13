import Head from "next/head";
import { ChangeEvent, useState } from "react";
import styles from './style.module.scss'

import { canSSRAuth } from "@/utils/canSSRAuth";
import Header from "@/components/ui/Header";

import {FiUpload} from 'react-icons/fi'

import { setupAPIClient } from "@/services/api";
import { GetServerSideProps } from 'next';

type questionProps ={
    id:number;
    nome: string;
}

interface nivelProps{
    nivelList : questionProps[]
} 

export default function Question({ nivelList }: nivelProps) {

    console.log(nivelList)
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  

  const [nivel, setNivel] = useState(nivelList ||[])
  const [nivelSelected, setNivelSelected] = useState(0)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/png' || image.type === 'image/jpeg') {
      setAvatarUrl(URL.createObjectURL(image));
      setImageAvatar(URL.createObjectURL(image));
    }
  }

  function handleChangeNivel(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = parseInt(event.target.value, 10);
    setNivelSelected(selectedValue);
  }
  
  

  return (
    <>
      <Head>
        <title>
          Aventuras lógicas - Gerenciar Banco de Questões
        </title>
      </Head>

      <Header />

      <main className={styles.container}>
        <h1>Novas perguntas</h1>

        <form className={styles.form}>
        <label className={styles.addFile}>
                    <span>
                        <FiUpload size={25} color='#fff'/>
                    </span>
                    <input type="file" accept="image/png, image/jpg" onChange={handleFile} />

                    {avatarUrl&&(
                           <img
                           className={styles.preview}
                           src={avatarUrl}
                           alt="Foto ilustrativa"
                           width={250}
                           height={250}
                           />
                    )}

                </label>

                <select value={nivelSelected} onChange={handleChangeNivel}>
                    {nivel.map((item,index) =>{
                        return(
                            <option key={item.id} value={index}>
                                {item.nome}
                            </option>
                        )
                    })}
                </select>

                <textarea
                placeholder="Digite o enunciado da questão"
                className={styles.input}
                />

               
                <input type="text"
                placeholder="Digite o primeiro Item"
                className={styles.input}
                />

                <select>
                    <option>
                        op 1
                    </option>

                    <option>
                        op 2
                    </option>
                </select>

                <input type="text"
                placeholder="Digite o segundo Item"
                className={styles.input}
                />

                <select>
                    <option>
                        op 1
                    </option>

                    <option>
                        op 2
                    </option>
                </select>

                <input type="text"
                placeholder="Digite o terceiro Item"
                className={styles.input}
                />

                <select>
                    <option>
                        op 1
                    </option>

                    <option>
                        op 2
                    </option>
                </select>

                <input type="text"
                placeholder="Digite o quarto Item"
                className={styles.input}
                />

                <select>
                    <option>
                        op 1
                    </option>

                    <option>
                        op 2
                    </option>
                </select>

                <button className={styles.button}>
                    cadastrar pergunta
                </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ nivelList: any }> = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  try {
    const response = await apiClient.get("/listNivel");

    return {
      props: {
        nivelList: response.data
      }
    };
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);

    return {
      props: {
        nivelList: undefined // Defina um valor padrão ou vazio, se necessário
      }
    };
  }
});
