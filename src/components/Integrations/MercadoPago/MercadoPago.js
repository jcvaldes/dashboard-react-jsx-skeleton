import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FORM_ID = 'payment-form'

const MercadoPago = () => {
  return <div>MercadoPago</div>
}

// export default MercadoPago
// export default function Product() {
//   const { id } = useParams() // id de producto
//   const [preferenceId, setPreferenceId] = useState(null)

//   useEffect(() => {
//     // luego de montarse el componente, le pedimos al backend el preferenceId
//     axios.post('/api/orders', { productId: id }).then((order) => {
//       setPreferenceId(order.preferenceId)
//     })
//   }, [id])

//   useEffect(() => {
//     if (preferenceId) {
//       // con el preferenceId en mano, inyectamos el script de mercadoPago
//       const script = document.createElement('script')
//       script.type = 'text/javascript'
//       script.src = 'https://sdk.mercadopago.com/js/v2'
//       script.setAttribute('data-preference-id', preferenceId)
//       const form = document.getElementById(FORM_ID)
//       form.appendChild(script)
//     }
//   }, [preferenceId])

//   return <form id={FORM_ID} method='GET' />
// }
