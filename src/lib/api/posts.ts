import { graphql, type GraphQlQueryResponseData } from "@octokit/graphql";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const request = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
});

//TODO:
export const getPostByNumber = async (num: number) => {
  const posts = await getPosts();
  // TODO:
  return posts.filter((post: any) => {
    return post.number === num;
  })[0];
};

export const getPosts = async () =>
  request<GraphQlQueryResponseData>(
    `
    query allIssues($owner: String!, $repo: String!) {
        repository(name: $repo, owner: $owner) {
          issues(first: 100) {
            nodes {
              title
              number
              createdAt
              bodyHTML
              body
            }
          }
        }
    }
    `,
    {
      owner: "raynerljm",
      repo: "nus-amplified-website",
    }
  ).then((data) => data.repository.issues.nodes);
