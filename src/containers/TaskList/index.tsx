import { useSelector } from 'react-redux'

import Tarefa from '../../components/Tarefa'
import * as S from '../../styles'

import { RootReducer } from '../../store'

const TaskList = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens

    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }
  const tarefas = filtraTarefas()

  const exibeResultadoFiltro = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? ` e "${termo}"` : ''

    if (criterio === 'totais') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: totais ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${complementacao}`
    }

    return mensagem
  }
  const exibeFiltro = exibeResultadoFiltro(tarefas.length)

  return (
    <S.MainContainer>
      <S.Titulo as="p">{exibeFiltro}</S.Titulo>
      <ul>
        {tarefas.map(({ titulo, descricao, prioridade, status, id }) => (
          <li key={id}>
            <Tarefa
              id={id}
              titulo={titulo}
              descricao={descricao}
              prioridade={prioridade}
              status={status}
            />
          </li>
        ))}
      </ul>
    </S.MainContainer>
  )
}

export default TaskList
