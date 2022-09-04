import matter from 'gray-matter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Navbar, Meta } from 'Components';

const glob = require('glob');

export default function ProjectsTemplate(props: {
  frontmatter: {
    title: string;
  };
  markdownBody: string;
}) {
  const router = useRouter();
  const projects = useTranslation('projects');

  return (
    <>
      <Meta title={props.frontmatter.title} description={'description'} />
      <Navbar />
      <main className="pt-20 pb-32">
        <h1 className="text-neutral-800 text-10xl">
          {projects.t(`${router.query.slug}`)}
        </h1>
        <h1>{props.frontmatter.title}</h1>
        <div>
          {/* eslint-disable-next-line react/no-children-prop */}
          {/* <ReactMarkdown children={props.markdownBody} /> */}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({
  locale,
  ...ctx
}: {
  locale: string;
  params: { slug: string };
}) {
  const { slug } = ctx.params;
  const content = await import(`../../../projects/${slug}.md`);
  const data = matter(content.default);

  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
      ...(await serverSideTranslations(locale, ['common', 'projects'])),
    },
  };
}

export async function getStaticPaths() {
  const languages = ['en', 'pt'];

  // get all .md files in the posts dir
  const blogs = glob.sync(`projects/**/*.md`);

  // remove path and extension to leave filename only
  const blogSlugs = blogs.map((file: any) =>
    file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim()
  );

  const paths: { params: { slug: string }; locale: string }[] = [];

  // create paths with `slug` param
  blogSlugs.map((slug: string) =>
    languages.map((locale: string) =>
      paths.push({
        params: {
          slug,
        },
        locale,
      })
    )
  );

  return {
    paths,
    fallback: false,
  };
}
