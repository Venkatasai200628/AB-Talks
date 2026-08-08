const WORDS = ['zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

/** Small counts read better spelled out in body copy. */
export function numberWord(n) {
  return WORDS[n] ?? String(n);
}
