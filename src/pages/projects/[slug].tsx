import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Carousel from 'components/Carousel';
import Footer from 'components/Footer';
import { Arrow } from 'components/Icons';
import Meta from 'components/Meta';
import Navbar from 'components/Navbar';
import { IProject } from 'interfaces';

import projectsData from '../../../public/projects.json';

export default function ProjectsTemplate({
  project,
  nextProject,
}: {
  project: IProject;
  nextProject: string;
}) {
  const { t } = useTranslation('common');
  const { description } = useTranslation('projects').t(project.slug, {
    returnObjects: true,
  });

  return (
    <>
      <Meta title={project.title} description={description} />
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
          {description}
        </div>
        <Carousel images={project.images} />
        <p className='absolute px-5 pt-2 sm:right-1/3 sm:w-1/3 sm:px-3 sm:text-xs md:text-sm xl:text-base'>
          {`${project.date} - ${
            project.endDate ? project.endDate : t(project.status)
          }`}
        </p>
        <Image
          src={`/assets/${project.slug}/banner.png`}
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
      <Footer />
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
