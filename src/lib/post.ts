import { Issue } from "./types/issues";

export const extractPostContent = (post: Issue) => {
  const titleKey = "title:";
  const descriptionKey = "description:";
  const imageKey = "image:";
  const imageSrcKeyStart = "http";
  const imageSrcKeyEnd = ")";
  const metadataEndTag = `</h2>`;

  /**
   * Extracting title, description and image src
   */
  const { body_html: bodyHTML, body } = post;
  console.log(post);
  if (!body || !bodyHTML) {
    return {
      title: "",
      description: "",
      imageSrc: "",
      contentHTML: "",
    };
  }

  /**
   * Retrieving title, description and image src
   */
  // Index of start of title line
  const titleIdx = body.indexOf(titleKey);
  // Index of start of description line
  const descriptionIdx = body.indexOf(descriptionKey);
  // Index of start of image line
  const imageIdx = body.indexOf(imageKey);

  const title = body.slice(titleIdx + titleKey.length, descriptionIdx).trim();
  const description = body
    .slice(descriptionIdx + descriptionKey.length, imageIdx)
    .trim();

  // Index of start of image src
  const imageSrcIdx = body.indexOf(imageSrcKeyStart, imageIdx);
  const imageSrcIdxEnd = body.indexOf(imageSrcKeyEnd, imageSrcIdx);

  // End of metadata section (i.e. title, description, image section)
  const metadataEndIdx = bodyHTML.indexOf(metadataEndTag);

  let imageSrc;
  if (imageSrcIdx > imageSrcIdxEnd || imageSrcIdxEnd > metadataEndIdx) {
    imageSrc = undefined;
  } else {
    imageSrc = body.slice(imageSrcIdx, imageSrcIdxEnd);
  }

  /**
   * Extracting content in HTML
   */
  const contentHTML = bodyHTML.slice(metadataEndIdx + metadataEndTag.length);
  return { title, description, imageSrc, contentHTML };
};
