import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Tarefa'

type FiltroState = {
  termo?: string
  criterio: 'prioridade' | 'status' | 'totais'
  valor?: enums.Prioridade | enums.Status // Retorno do Filtro
}
const initialState: FiltroState = {
  termo: '',
  criterio: 'totais'
}

const filtroSlice = createSlice({
  name: 'filtro',
  initialState,
  reducers: {
    alteraTermo: (state, action: PayloadAction<string>) => {
      state.termo = action.payload
    },
    alteraFiltro: (state, action: PayloadAction<FiltroState>) => {
      state.criterio = action.payload.criterio
      state.valor = action.payload.valor
    }
  }
})

export const { alteraTermo, alteraFiltro } = filtroSlice.actions

export default filtroSlice.reducer
