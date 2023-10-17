
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { setupAPIClient } from '@/services/api';
import { canSSRAuth } from '@/utils/canSSRAuth';
import styles from './style.module.scss';

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

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const image = e.target.files[0];
    if (!image) return;
    if (image.type === 'image/png' || image.type === 'image/jpeg') {
      setAvatarUrl(URL.createObjectURL(image));
      setImageAvatar(image);
    }
  };

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
      const data = new FormData();
      data.append('texto', description);
      data.append('nivelId', nivelId.toString());
      if (imageAvatar) {
        data.append('imagem', imageAvatar);
      }
      options.forEach((option, index) => {
        data.append(`item${index + 1}_texto`, option.texto);
        data.append(`item${index + 1}_correta`, option.correta ? 'true' : 'false');
      });
    
      const apiClient = setupAPIClient();
      await apiClient.post('/pergunta', data).catch((error) => {
        console.error('Error from server:', error);
        toast.error('Erro ao cadastrar pergunta');
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao cadastrar pergunta');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div>
        <label>Descrição da pergunta:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label>Imagem (opcional):</label>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        {avatarUrl && (
          <img src={avatarUrl} alt="Imagem ilustrativa" width={150} height={150} />
        )}
      </div>
      <div>
        <label>Nível da pergunta:</label>
        <select value={nivelId} onChange={(e) => setNivelId(Number(e.target.value))}>
          {nivelList.map((nivel) => (
            <option key={nivel.id} value={nivel.id}>
              {nivel.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Opções de resposta:</label>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={option.texto}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index].texto = e.target.value;
                setOptions(newOptions);
              }}
            />
            <input
              type="checkbox"
              checked={option.correta}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index].correta = e.target.checked;
                setOptions(newOptions);
              }}
            />
            <button type="button" onClick={() => handleRemoveOption(index)}>
              Remover
            </button>
          </div>
        ))}
        {options.length < 4 && (
          <button type="button" onClick={handleAddOption}>
            Adicionar Opção
          </button>
        )}
      </div>
      <div>
        <button type="submit">Cadastrar Pergunta</button>
      </div>
    </form>
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
