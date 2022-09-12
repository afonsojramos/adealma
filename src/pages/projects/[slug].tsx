import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';

import { Navbar, Meta, Arrow, Footer } from 'Components';
import { IProject, IProjectDetails } from 'Interfaces';

import projectsData from '../../../public/projects.json';

export default function ProjectsTemplate({
  project,
  nextProject,
}: {
  project: IProject;
  nextProject: string;
}) {
  const { t } = useTranslation('common');
  const details = useTranslation('projects').t<string, IProjectDetails>(
    project.slug,
    {
      returnObjects: true,
    }
  );

  return (
    <>
      <Meta title={project.title} description={details.description} />
      <div className="child:bg-primary-100">
        <Navbar
          title={`${t('projects_title')}`}
          secondaryTitle={project.title}
        />
      </div>
      <main className="pt-32 md:pt-24 pb-32">
        <Link href="/projects/">
          <a>
            <Arrow className="absolute left-8 h-6 hidden lg:block" />
          </a>
        </Link>
        <div className="px-8 md:px-[27%] xl:px-[33%] leading-[28px] md:leading-[30px] xl:leading-[40px] text-2xl xl:text-3xl mb-12 break-normal">
          {details.description}
        </div>
        <div className="flex flex-row items-center w-screen px-5">
          <div className="w-1/3 px-2">
            <Image
              src="/assets/casa-do-cristelo.png"
              alt="Casa do Cristelo"
              width={820}
              height={1260}
              layout="responsive"
            />
          </div>
          <div className="w-1/3 px-2">
            <Image
              src="/assets/casa-do-pescador.png"
              alt="Casa do Pescador"
              width={820}
              height={1260}
              layout="responsive"
            />
          </div>
          <div className="w-1/3 px-2">
            <Image
              src="/assets/casas-da-matriz.png"
              alt="Casas da Matriz"
              width={820}
              height={1260}
              layout="responsive"
            />
          </div>
        </div>
        <div className="flex flex-row items-center w-screen px-7">
          {details.construction}
        </div>
        <div className="flex flex-row items-center w-screen px-7 mt-10">
          <Image
            src="/assets/casas.png"
            alt="Casas"
            width={2476}
            height={1416}
          />
        </div>
        <div className="flex flex-row-reverse w-screen justify-between">
          <Link href={`/projects/${nextProject || ''}`}>
            <a>
              <Arrow className="h-6 m-8 rotate-180" />
            </a>
          </Link>
        </div>
        <Footer />
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
      ...(await serverSideTranslations(locale, ['common', 'projects'])),
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
