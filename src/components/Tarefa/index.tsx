import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { Botao, BotaoSalvar } from '../../styles'
import { editar, remover, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'

import * as enums from '../../utils/enums/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  const cancelarEdicao = () => {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  const alteraStatusTarefa = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked)
    dispatch(alteraStatus({ id, finalizado: e.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          onChange={alteraStatusTarefa}
          checked={status === enums.Status.CONCLUIDA}
          type="checkbox"
          id={titulo}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    id,
                    titulo,
                    prioridade,
                    status,
                    descricao
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
