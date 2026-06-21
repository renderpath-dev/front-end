import { Link, Route, Routes, useParams } from 'react-router'

const productNames: Record<string, string> = {
  'lamp-101': 'Arc Desk Lamp',
  'chair-204': 'Mesh Task Chair',
}

function ProductParamResult() {
  const { productId } = useParams<'productId'>()

  if (!productId) {
    return <p className="routing-error-text">The matched route did not provide productId.</p>
  }

  const productName = productNames[productId]

  return (
    <div className="routing-result-box">
      <p>
        Runtime param: <code>{productId}</code>
      </p>
      <p>{productName ?? 'No local product matches this string.'}</p>
    </div>
  )
}

export function DynamicRouteParams() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">05 / Dynamic params</p>
      <h2>A dynamic path segment becomes a string parameter</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/products/lamp-101">Known product</Link>
        <Link to="/practice/products/missing-999">Unknown product</Link>
      </div>
      <Routes>
        <Route element={<ProductParamResult />} path="/practice/products/:productId" />
      </Routes>
    </article>
  )
}
