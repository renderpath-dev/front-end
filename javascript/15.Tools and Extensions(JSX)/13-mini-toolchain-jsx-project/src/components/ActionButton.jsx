// Goal:
// Reuse a button component with even handler props and children

export function ActionButton({children, onPress}) {
    return (
        <button type = "butto" className="action-button" onClick={{onPress}}>
            {children}
        </button>
    );
}
