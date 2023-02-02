import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';

import Footer from 'components/Footer';
import { Arrow } from 'components/Icons';
import Meta from 'components/Meta';
import Navbar from 'components/Navbar';
import { IProject, IProjectDetails } from 'interfaces';

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
      <Navbar
        title={`${t('projects_title')}`}
        secondaryTitle={project.title}
        background
      />
      <main className='pt-32'>
        <Link href='/projects/'>
          <Arrow className='absolute left-8 hidden h-6 lg:block' />
        </Link>
        <div className='mb-12 break-normal px-8 text-xl leading-[28px] md:px-[27%] md:leading-[25px] xl:px-[33%] xl:text-2xl xl:leading-[30px]'>
          {details.description}
        </div>
        <div className='flex w-screen flex-row items-center px-5'>
          <Image
            src='/assets/casa-do-cristelo.png'
            alt='Casa do Cristelo'
            width={820}
            height={1260}
            className='w-1/3 px-2'
            priority
          />
          <div className='w-1/3 px-2'>
            <Image
              src='/assets/casa-do-pescador.png'
              alt='Casa do Pescador'
              width={820}
              height={1260}
              className=''
              priority
            />
            <p className='absolute pt-2 sm:text-xs md:text-sm xl:text-base'>
              {`${project.date} - ${
                project.endDate ? project.endDate : t(project.status)
              }`}
            </p>
          </div>
          <Image
            src='/assets/casas-da-matriz.png'
            alt='Casas da Matriz'
            width={820}
            height={1260}
            className='w-1/3 px-2'
            priority
          />
        </div>

        <Image
          src='/assets/casas.png'
          alt='Casas'
          width={2476}
          height={1416}
          className='mt-24 flex w-screen flex-row items-center px-7'
        />
        <div className='flex w-screen flex-row-reverse justify-between'>
          <Link href={`/projects/${nextProject || ''}`}>
            <Arrow className='m-8 h-6 rotate-180' />
          </Link>
          <Link href='/projects'>
            <Arrow className='m-8 flex h-6 lg:hidden' />
          </Link>
        </div>
      </main>
      <Footer about={t('about')} />
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
