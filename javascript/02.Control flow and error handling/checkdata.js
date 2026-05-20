function checkData() {
  if (document.form1.threeChar.value.length === 3) {
    return true;
  } alert (
    `Enter exactly three character.${document.form1.threeChar.value} is not a valid character.`,
  );
  return false;
}