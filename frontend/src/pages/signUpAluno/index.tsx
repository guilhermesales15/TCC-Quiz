import Head from 'next/head'
import Image from 'next/image'
import { useState, FormEvent, useContext } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/home.module.scss'
import { toast } from 'react-toastify'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import { AuthContext } from '@/context/AuthContext'

import Header from '@/components/ui/Header'

const inter = Inter({ subsets: ['latin'] })

export default function SignUpAluno() {
  const { signUpAluno } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUpAluno(event: FormEvent) {
    event.preventDefault();

    if (name === "" || password === "") {
      toast.error("Nome e senha são obrigatórios");
      return;
    }

    setLoading(true);

    try {
      const data = {
        name,
        email,
        password,
        birthDate,
      };

      await signUpAluno(data);

      
    } catch (error) {
      toast.error('Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Head>
        <title>Aventuras Lógicas - Aluno</title>
      </Head>

      <div className={styles.containerCenter}>
        <h1 className={styles.text}>Cadastro Aluno</h1>

        <div className={styles.login}>
          <form onSubmit={handleSignUpAluno}>
            <Input
              placeholder='Insira o seu nome completo'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder='Insira o seu email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Insira a data de nascimento'
              type='date'
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />

            <Input
              placeholder='Insira a sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
