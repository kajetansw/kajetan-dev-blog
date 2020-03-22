import { useStaticQuery, graphql } from 'gatsby';

const useSpeakingPosts = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMdx(
        filter: { frontmatter: { tags: { eq: "speaking" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            description
            title
            tags
            date
          }
        }
      }
    }
  `);

  return data.allMdx.nodes.map((node) => ({
    description: node.frontmatter.description,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    slug: node.fields.slug
  }));
};

export default useSpeakingPosts;
