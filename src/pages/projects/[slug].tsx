import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Navbar, Meta, Arrow } from 'Components';
import { IProject, IProjectDetails } from 'Interfaces';

import projectsData from '../../../public/projects.json';

export default function ProjectsTemplate({
  project,
  nextProject,
}: {
  project: IProject;
  nextProject: string;
}) {
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
        <Link href="/projects/">
          <a>
            <Arrow className="absolute left-8 h-6 hidden lg:block" />
          </a>
        </Link>
        <h1 className="text-neutral-800 text-10xl">{project.title}</h1>
        <div>
          <span>{details.description}</span>
        </div>
        <div className="flex flex-row-reverse w-screen justify-between">
          <Link href={`/projects/${nextProject || ''}`}>
            <a>
              <Arrow className="h-6 m-8 rotate-180" />
            </a>
          </Link>
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

  const projectIndex = projectsData.findIndex(
    (project) => project.slug === slug
  );

  return {
    props: {
      project: projectsData[projectIndex],
      nextProject: projectsData[projectIndex + 1]?.slug || null,
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
