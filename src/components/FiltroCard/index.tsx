import { useDispatch, useSelector } from 'react-redux'

import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { alteraFiltro } from '../../store/reducers/filtro'
import { RootReducer } from '../../store'

export type Props = {
  legenda: string
  valor: enums.Prioridade | enums.Status
  criterio: 'prioridade' | 'status' | 'totais'
}

const FiltroCard = ({ criterio, valor, legenda }: Props) => {
  const dispatch = useDispatch()
  const { filtro, tarefas } = useSelector((state: RootReducer) => state)

  const verificaEstaAtivo = () => {
    const mesmoCriterio = filtro.criterio === criterio
    const mesmoValor = filtro.valor === valor

    return mesmoCriterio && mesmoValor
  }
  const ativo = verificaEstaAtivo()

  const filtrar = () => {
    dispatch(
      alteraFiltro({
        criterio,
        valor
      })
    )
  }

  const contaTarefas = () => {
    if (criterio === 'totais') return tarefas.itens.length
    if (criterio === 'prioridade') {
      return tarefas.itens.filter((item) => item.prioridade === valor).length
    } else if (criterio === 'status') {
      return tarefas.itens.filter((item) => item.status === valor).length
    }
  }
  const contador = contaTarefas()

  return (
    <S.Card ativo={ativo} onClick={filtrar}>
      <S.Contador>{contador}</S.Contador>
      <S.Label>{legenda}</S.Label>
    </S.Card>
  )
}

export default FiltroCard
