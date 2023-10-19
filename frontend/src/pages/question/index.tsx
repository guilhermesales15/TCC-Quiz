import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { setupAPIClient } from '@/services/api';
import { canSSRAuth } from '@/utils/canSSRAuth';
import styles from './style.module.scss';
import {FiPlus} from 'react-icons/fi'

import Header from '@/components/ui/Header';
import Head from 'next/head';

interface NivelItem {
  id: number;
  nome: string;
}

interface CreateQuestionFormProps {
  nivelList: NivelItem[];
}

export default function CreateQuestionForm({ nivelList }: CreateQuestionFormProps) {
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([
    { texto: '', correta: false },
    { texto: '', correta: false },
    { texto: '', correta: false },
    { texto: '', correta: false },
  ]);

  const [nivelId, setNivelId] = useState(nivelList.length > 0 ? nivelList[0].id : 1);

  

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, { texto: '', correta: false }]);
    }
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        texto: description,
        nivelId: nivelId,
        opcoes: options,
        banner: '' // Nome da imagem aqui, se necessário
      };

      const apiClient = setupAPIClient();
      await apiClient.post('/pergunta', data);

      toast.success('Pergunta cadastrada com sucesso');
    } catch (error) {
      console.error('Error from server:', error);
      toast.error('Erro ao cadastrar pergunta');
    }
  };

  return (

    <>

    <Head>
      <title>
        Aventuras Lógicas - Cadastro de Perguntas
      </title>

    </Head>

    <Header/>
    <main className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.form}>

     
      <div>
        <h1>Descrição da pergunta:</h1>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
      </div>
     
      <div>
        <h1>Nível da pergunta:</h1>
        <select value={nivelId} onChange={(e) => setNivelId(Number(e.target.value))}>
          {nivelList.map((nivel) => (
            <option key={nivel.id} value={nivel.id}>
              {nivel.nome}
            </option>
          ))}
        </select>
      </div>
      <div >
        <h1 >Opções de resposta:</h1>
        {options.map((option, index) => (
          <div key={index} >
            <input
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={option.texto}
              className={styles.input}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index].texto = e.target.value;
                setOptions(newOptions);
              }}
            />
            <input
              type="checkbox"
              checked={option.correta}
              className={styles.checkbox}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index].correta = e.target.checked;
                setOptions(newOptions);
              }}
            />
            <button type="button"  className={styles.button} onClick={() => handleRemoveOption(index)}>
              Remover
            </button>
          </div>
        ))}
        {options.length < 4 && (
          <button type="button"  className={styles.buttonPlus}  onClick={handleAddOption}>
            <FiPlus color="#fff" size={24}/>
          </button>
        )}
      </div>
      <div>
        <button type="submit" className={styles.buttonFinal}>Cadastrar Pergunta</button>
      </div>
    </form>

    </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/listNivel');
  return {
    props: {
      nivelList: response.data,
    },
  };
});
