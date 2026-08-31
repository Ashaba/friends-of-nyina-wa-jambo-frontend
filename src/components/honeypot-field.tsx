/**
 * A decoy input that traps form-filling bots.
 *
 * It must stay reachable in the DOM for a bot to find and fill, so it cannot
 * use `display: none` or the `hidden` attribute. Instead it is pulled off
 * screen, taken out of the tab order, and hidden from assistive technology, so
 * no person — sighted, keyboard-only, or screen-reader — ever encounters it.
 * `autoComplete="off"` keeps a browser's autofill from filling it on someone's
 * behalf and getting them wrongly flagged.
 *
 * The server actions treat any value here as a bot; see `lib/form-actions`.
 */
export function HoneypotField(): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden"
    >
      <label htmlFor="website">Website</label>
      <input
        type="text"
        id="website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
