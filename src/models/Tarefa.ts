import * as enums from '../utils/enums/Tarefa'

class Tarefa {
  titulo: string
  prioridade: enums.Prioridade
  status: enums.Status
  descricao: string
  id: number

  constructor(
    titulo_: string,
    prioridade_: enums.Prioridade,
    status_: enums.Status,
    descricao_: string,
    id_: number
  ) {
    this.titulo = titulo_
    this.prioridade = prioridade_
    this.status = status_
    this.descricao = descricao_
    this.id = id_
  }
}

export default Tarefa
