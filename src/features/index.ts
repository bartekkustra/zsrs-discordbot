import { checkForCzarek } from './czarek'
import { checkForEdyta } from './edyta'
import { checkForUrl } from './url'
import { gamesBot } from './games'
import { helpCommand } from './help'
import { szczepienie } from './szczepienie'

const features = {
  checkForEdyta,
  checkForCzarek,
  checkForUrl,
  gamesBot,
  helpCommand,
  szczepienie,
}

export default features
