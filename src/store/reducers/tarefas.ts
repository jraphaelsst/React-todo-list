import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

type TarefasState = {
  itens: Tarefa[]
}
const initialState: TarefasState = {
  itens: [
    {
      id: 0,
      titulo: 'Estudar React',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      descricao: 'Praticar useState e useEffect;\nAprender mais sobre Redux'
    },
    {
      id: 1,
      titulo: 'Estudar React',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      descricao: 'Praticar useState e useEffect;\nAprender mais sobre Redux'
    },
    {
      id: 2,
      titulo: 'Estudar React',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      descricao: 'Praticar useState e useEffect;\nAprender mais sobre Redux'
    },
    {
      id: 3,
      titulo: 'Estudar TypeScript',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.CONCLUIDA,
      descricao: 'Rever aulas de Typescript'
    },
    {
      id: 4,
      titulo: 'Estudar JavaScript',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.CONCLUIDA,
      descricao: 'Aprofundar na linguagem'
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  // initialState: initialState,
  // Pode omitir a constante como parâmetro por ter o mesmo nome da propriedade
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((tarefa) => tarefa.id !== action.payload)
      ]
    },

    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },

    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )
      if (tarefaJaExiste) {
        alert('Tarefa já existe com esse nome.')
      } else {
        console.log(state.itens.length)
        const ultimaTarefa = state.itens[state.itens.length - 1]
        console.log(ultimaTarefa.id)
        const novaTarefa = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 0
        }
        console.log(novaTarefa.id)
        state.itens.push(novaTarefa)
      }
    },

    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { editar, remover, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
