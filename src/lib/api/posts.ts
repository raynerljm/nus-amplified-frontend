import { Octokit } from "@octokit/rest";
import { Issue } from "../types/issues";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "raynerljm";
const REPO = "nus-amplified-website";

const octokit = new Octokit();

export const getPostByNumber = async (num: number): Promise<Issue> => {
  const res = await octokit.rest.issues.get({
    // headers: {
    //   authorization: `token ${GITHUB_TOKEN}`,
    // },
    mediaType: {
      format: "full",
    },
    issue_number: num,
    owner: OWNER,
    repo: REPO,
  });
  return res.data;
};

export const getPosts = async (): Promise<Issue[]> => {
  const res = await octokit.rest.issues.listForRepo({
    // headers: {
    //   authorization: `token ${GITHUB_TOKEN}`,
    // },
    mediaType: {
      format: "full",
    },
    labels: "blog post",
    state: "open",
    owner: OWNER,
    repo: REPO,
  });
  return res.data;
};
