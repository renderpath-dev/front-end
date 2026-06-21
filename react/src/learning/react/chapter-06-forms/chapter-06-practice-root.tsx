import { FormSubmitDefaultBehavior } from './01-form-submit-default-behavior/form-submit-default-behavior'
import { ControlledTextInput } from './02-controlled-text-input/controlled-text-input'
import { ControlledUncontrolledBoundary } from './03-controlled-uncontrolled-boundary/controlled-uncontrolled-boundary'
import { ObjectFormState } from './04-object-form-state/object-form-state'
import { ControlledTextareaSelect } from './05-controlled-textarea-select/controlled-textarea-select'
import { ControlledCheckboxRadio } from './06-controlled-checkbox-radio/controlled-checkbox-radio'
import { FormValidationFeedback } from './07-form-validation/form-validation-feedback'
import { SubmitStatusModel } from './08-submit-status-model/submit-status-model'
import { TypedFormFields } from './09-typed-form-fields/typed-form-fields'
import { SellerProductForm } from './seller-product-form-mini-project/seller-product-form'
import './chapter-06-practice.css'

const practiceSections = [
  {
    id: 'submit-default',
    title: 'Submit behavior',
    component: <FormSubmitDefaultBehavior />,
  },
  {
    id: 'controlled-text',
    title: 'Controlled text',
    component: <ControlledTextInput />,
  },
  {
    id: 'ownership-boundary',
    title: 'Ownership boundary',
    component: <ControlledUncontrolledBoundary />,
  },
  {
    id: 'object-state',
    title: 'Object state',
    component: <ObjectFormState />,
  },
  {
    id: 'textarea-select',
    title: 'Textarea and select',
    component: <ControlledTextareaSelect />,
  },
  {
    id: 'checkbox-radio',
    title: 'Checkbox and radio',
    component: <ControlledCheckboxRadio />,
  },
  {
    id: 'validation',
    title: 'Validation',
    component: <FormValidationFeedback />,
  },
  {
    id: 'submit-status',
    title: 'Submit status',
    component: <SubmitStatusModel />,
  },
  {
    id: 'typed-fields',
    title: 'Typed fields',
    component: <TypedFormFields />,
  },
]

export function Chapter06PracticeRoot() {
  return (
    <main className="chapter-six-shell">
      <header className="chapter-six-header">
        <p className="chapter-six-eyebrow">React Chapter 06</p>
        <h1>Forms and Controlled Components</h1>
        <p>
          Follow browser submission, React state ownership, typed field updates,
          validation, and explicit submission feedback from isolated exercises into one
          SellerHub product form.
        </p>
      </header>

      <section aria-labelledby="chapter-six-practice-title">
        <div className="chapter-six-section-heading">
          <div>
            <p>Concept practice</p>
            <h2 id="chapter-six-practice-title">One mechanism per directory</h2>
          </div>
          <p>Each card isolates one ownership, event, state, or type boundary.</p>
        </div>

        <div className="chapter-six-practice-grid">
          {practiceSections.map((practice) => (
            <div id={practice.id} key={practice.id} title={practice.title}>
              {practice.component}
            </div>
          ))}
        </div>
      </section>

      <SellerProductForm />
    </main>
  )
}
