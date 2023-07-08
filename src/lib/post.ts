export const extractDescriptionAndContent = (bodyHTML: string) => {
  const startTag = `<h2 dir="auto">`;
  const endTag = `</h2>`;

  const descTagStart = bodyHTML.indexOf(startTag);
  const descTagEnd = bodyHTML.indexOf(endTag);

  const descriptionString = bodyHTML.slice(
    descTagStart + startTag.length,
    descTagEnd
  );

  const contentHTML = bodyHTML.slice(descTagEnd + endTag.length);

  return { descriptionString, contentHTML };
};
