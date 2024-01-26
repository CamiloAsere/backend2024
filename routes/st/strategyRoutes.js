
import { express } from '../../start/app.js';
const { Router } = express;
const strategiesRouter = Router();
import { handleChangeStrategy, handleRequest, StrategyA1, StrategyA2, StrategyB1, StrategyB2 } from './strategies.js';


const strategiesA = {
  strategyA1: StrategyA1,
  strategyA2: StrategyA2
};

const strategiesB = {
  strategyB1: StrategyB1,
  strategyB2: StrategyB2
};

const currentStrategyA = { value: 'strategyA1' };
const currentStrategyB = { value: 'strategyB1' };

strategiesRouter.get('/routeA', handleRequest(strategiesA, currentStrategyA));
strategiesRouter.get('/change-strategy-a/:strategy', handleChangeStrategy(strategiesA, currentStrategyA));
strategiesRouter.get('/routeB', handleRequest(strategiesB, currentStrategyB));
strategiesRouter.get('/change-strategy-b/:strategy', handleChangeStrategy(strategiesB, currentStrategyB));

export default strategiesRouter;

