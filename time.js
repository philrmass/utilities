export function inSameMonth(at0, at1) {
  const date0 = new Date(at0);
  const date1 = new Date(at1);

  return (date0.getMonth() === date1.getMonth());
}
