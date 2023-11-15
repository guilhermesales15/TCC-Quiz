import { setupAPIClient } from "@/services/api";
import Modal from "react-modal";
import styles from "./style.module.scss";
import { FiX } from "react-icons/fi";
import { FaTrash } from 'react-icons/fa';
import { Pergunta, Opcao } from "@/pages/dashboard";

interface ModalPerguntaProps {
  isOpen: boolean;
  handleClose: () => void;
  pergunta: Pergunta | null;
}

export function ModalPergunta({ isOpen, handleClose, pergunta }: ModalPerguntaProps) {

  const handleDeletePergunta = async () => {
    if (!pergunta) {
      console.error('Tentativa de exclusão de pergunta nula');
      return;
    }
  
    try {
      const api = setupAPIClient();
      const response = await api.delete(`/deletePergunta/${pergunta.id}`); 
      window.location.reload();

      if (response.status === 204) {
        console.log('Pergunta excluída com sucesso');
        handleClose();
      } else {
        console.error('Erro ao excluir a pergunta');
      }
    } catch (error) {
      console.error('Erro ao excluir a pergunta', error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: '30px',
      backgroundColor: '#1c271c'
    },
  };

  if (!pergunta) {
    return null; 
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <div className={styles.closeModal}>
        <button type="button" onClick={handleClose} className="react-modal-close" style={{ background: 'transparent', border: 0 }}  >
          <FiX size={45} color="#f34748" />
        </button>
      </div>

      <div className={styles.container}>
        <h2>Detalhes da pergunta:</h2>

        <div className={styles.enunciado}>
          <h3>Enunciado da pergunta:</h3>
          <span className={styles.texto}>{pergunta.texto}</span>
          <button style={{ background: 'transparent', border: 0 }}>
            
          </button>
        </div>
        
        <div className={styles.dificuldade}>
          <h3>Dificuldade:</h3>

          <span >{pergunta.nivel.nome}</span>

          <button style={{ background: 'transparent', border: 0 }}>
          
          </button>

        </div>
        <h3>Opções:</h3>
        <ul>
          {pergunta.opcoes.map((opcao: Opcao) => (
            <li
              className={`${styles.opItem} ${opcao.correta ? styles.correta : ''}`}
              key={opcao.id}
            >
              {opcao.texto}
              <button style={{ background: 'transparent', border: 0 }}>
               
              </button>
            </li>
          ))}
        </ul>
        <button className={styles.exButton} onClick={handleDeletePergunta} style={{ background: 'transparent', border: 0 }} >
          <FaTrash size={35} color="#FFF" />
        </button>
      </div>
    </Modal>
  );
}
