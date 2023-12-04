import BotaoAdicionar from '../../components/BotaoAdicionar'
import Sidebar from '../../containers/Sidebar'
import TaskList from '../../containers/TaskList'

const Home = () => (
  <>
    <Sidebar mostrarFiltros />
    <TaskList />
    <BotaoAdicionar />
  </>
)

export default Home
