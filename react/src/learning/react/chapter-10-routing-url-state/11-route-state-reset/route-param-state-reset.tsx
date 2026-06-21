import { useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router'

function ProductDraftEditor({ productId }: { productId: string }) {
  const [draftTitle, setDraftTitle] = useState(`Draft for ${productId}`)

  return (
    <div className="routing-result-box">
      <p>
        Editor identity: <code>{productId}</code>
      </p>
      <label className="routing-field">
        <span>Local draft title</span>
        <input
          onChange={(event) => setDraftTitle(event.currentTarget.value)}
          value={draftTitle}
        />
      </label>
    </div>
  )
}

function KeyedProductEditorRoute() {
  const { productId } = useParams<'productId'>()

  if (!productId) {
    return <p className="routing-error-text">Missing productId.</p>
  }

  return <ProductDraftEditor key={productId} productId={productId} />
}

export function RouteParamStateReset() {
  return (
    <article className="routing-practice-panel">
      <p className="routing-practice-kicker">11 / Component identity</p>
      <h2>A route param can choose whether local state resets</h2>
      <div className="routing-practice-actions">
        <Link to="/practice/editor/lamp-101">Edit lamp</Link>
        <Link to="/practice/editor/chair-204">Edit chair</Link>
      </div>
      <Routes>
        <Route element={<KeyedProductEditorRoute />} path="/practice/editor/:productId" />
      </Routes>
      <p className="routing-practice-note">
        Changing productId changes the key, so React discards the previous editor state cell.
      </p>
    </article>
  )
}
