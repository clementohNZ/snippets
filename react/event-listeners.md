# React and Event Listeners

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Accessing State](#accessing-state)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Accessing State

You cannot access state changes from an event listener because it will always reference the initial state.

But if you need to access the state, you can use `useRef.current` to access the latest state.

Below is an example of where this is used to prevent the triggering of keyboard shortcuts when the user is typing in a search bar.

```ts
// Setting up ref
const searchBarInFocusRef = useRef(false)

// Handler
const handleKeyboardShortcuts = (event: KeyboardEvent): void => {
  if (!searchBarInFocusRef.current && GlobalKeyboardService.isAddShortcut(event)) {
    onOpen()
  }
}

// Adding listener
window.addEventListener(`keydown`, handleKeyboardShortcuts)
```
