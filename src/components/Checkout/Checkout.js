import { useExternalScript } from '../../hooks/useExternalScript'

const Checkout = () => {
  const externalScript = 'https://sdk.mercadopago.com/js/v2'
  const state = useExternalScript(externalScript)
  return (
    <div>
      {state === 'loading' && <p>Loading...</p>}
      {/* {state === 'ready' && <PaymentForm />} */}
    </div>
  )
}

export default Checkout
