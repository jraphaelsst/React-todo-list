import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { Botao, Campo } from '../../styles'
import FiltroCard from '../../components/FiltroCard'
import * as enums from '../../utils/enums/Tarefa'

import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'

type Props = {
  mostrarFiltros: boolean
}

const Sidebar = ({ mostrarFiltros }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alteraTermo(evento.target.value))}
            />
            <S.Filtros>
              <FiltroCard
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="pendentes"
              />
              <FiltroCard
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="concluídas"
              />
              <FiltroCard
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="urgentes"
              />
              <FiltroCard
                valor={enums.Prioridade.IMPORTANTE}
                criterio="prioridade"
                legenda="importantes"
              />
              <FiltroCard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="normais"
              />
              <FiltroCard
                valor={enums.Prioridade.URGENTE}
                criterio="totais"
                legenda="totais"
              />
            </S.Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')}>Voltar à lista de Tarefas</Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default Sidebar
