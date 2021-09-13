import { checkForCzarek } from './czarek'
import { checkForEdyta } from './edyta'
import { checkForUrl } from './url'
import { gamesBot } from './games'
import { helpCommand } from './help'

const features = {
  checkForEdyta,
  checkForCzarek,
  checkForUrl,
  gamesBot,
  helpCommand,
}

export default features
