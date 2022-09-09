import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Navbar, Meta } from 'Components';

import { IProject } from '.';
import projectsData from '../../../public/projects.json';

type IProjectDetails = {
  description: string;
  floors: string;
  construction: string;
};

export default function ProjectsTemplate({ project }: { project: IProject }) {
  const details = useTranslation('projects').t<string, IProjectDetails>(
    project.slug,
    {
      returnObjects: true,
    }
  );

  return (
    <>
      <Meta title={project.title} description={details.description} />
      <Navbar />
      <main className="pt-20 pb-32">
        <h1 className="text-neutral-800 text-10xl">{project.title}</h1>
        <div>
          <span>{details.description}</span>
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

  return {
    props: {
      project: projectsData.filter((project) => project.slug === slug)[0]!,
      ...(await serverSideTranslations(locale, ['projects'])),
    },
  };
}

export async function getStaticPaths() {
  const languages = ['en', 'pt'];

  const projectSlugs = projectsData.map(({ slug }) => slug);

  const paths: { params: { slug: string }; locale: string }[] = [];

  // create paths with `slug` param
  projectSlugs.map((slug: string) =>
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
