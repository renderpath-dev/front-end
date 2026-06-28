import { BrowserRouter } from 'react-router'
import { SellerHubAppContext } from './sellerhub-app-context'
import { SellerHubRouter } from './sellerhub-router'

export function SellerHubCapstoneApp() {
  return (
    <SellerHubAppContext>
      <BrowserRouter>
        <SellerHubRouter />
      </BrowserRouter>
    </SellerHubAppContext>
  )
}
