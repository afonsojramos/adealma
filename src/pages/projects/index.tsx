import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Navbar, Meta, Footer } from 'Components';

import Arrow from '../../../public/assets/arrow.svg';
import LinkChain from '../../../public/assets/link-chain.svg';
import content from '../../../public/projects.json';

export type IProject = {
  title: string;
  location: string;
  status: string;
  date: string;
  slug: string;
};

enum Status {
  Location,
  InverseLocation,
  Status,
  InverseStatus,
  Date,
  InverseDate,
}

const Projects = ({ projects }: { projects: IProject[] }) => {
  const [sort, setSort] = useState(Status.Date);
  const { t } = useTranslation('common');
  const projectsDescription = t<string, string[]>('projects_description', {
    returnObjects: true,
  });

  const sortRotation = (sortArrow: Status) => {
    if (sort % 2 === 0)
      return sort === sortArrow ? '-rotate-90' : '-rotate-90 opacity-0';
    return sort === sortArrow + 1 ? 'rotate-90' : '-rotate-90 opacity-0';
  };

  const getProjectYear = (date: string) => {
    return new Date(date).getFullYear();
  };

  const expandYear = (year: string) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return year === currentYear.toString() ? t('current_year') : year;
  };

  return (
    <>
      <Meta title={t('projects_title')} description={t('description')} />
      <Navbar title={t('projects_title')} />
      <main className="inline-block w-full mt-32 lg:mt-48 rounded-lg overflow-x-auto">
        <Link href={`/`}>
          <a>
            <Arrow className="absolute left-8 h-8 hidden lg:block" />
          </a>
        </Link>
        <div className="pl-8 md:pl-16 lg:pl-32 pr-32 md:pr-32 lg:pr-64 xl:pr-96 2xl:pr-[40rem] leading-[28px] md:leading-[30px] xl:leading-[40px] text-[22px] md:text-2xl xl:text-3xl line-clamp-5 hover:line-clamp-none mb-12">
          {projectsDescription.map((paragraph, pNum) => (
            <p key={pNum} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
        <table className="table-fixed w-screen text-left">
          <thead>
            <tr className="border-b-[1px] border-primary-900 tracking-widest text-lg child:font-light">
              <th className="hidden md:table-cell md:w-80 lg:w-[29%]" />
              <th className="hidden md:table-cell md:w-40 lg:w-[31%] lg:pl-20">
                <button
                  className="group inline-flex items-center leading-10"
                  onClick={() =>
                    setSort(
                      sort === Status.Location
                        ? Status.InverseLocation
                        : Status.Location
                    )
                  }
                >
                  <Arrow
                    className={`h-2 mr-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      Status.Location
                    )}`}
                  />
                  {t('location')}
                </button>
              </th>
              <th className="hidden md:table-cell md:w-32 lg:w-[20%] px-5">
                <button
                  className="group inline-flex items-center leading-10"
                  onClick={() =>
                    setSort(
                      sort === Status.Status
                        ? Status.InverseStatus
                        : Status.Status
                    )
                  }
                >
                  <Arrow
                    className={`h-2 mr-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      Status.Status
                    )}`}
                  />
                  {t('status')}
                </button>
              </th>
              <th className="flex items-center md:w-40 lg:w-3/12 pl-8 md:px-5">
                <button
                  className="group inline-flex items-center leading-10"
                  onClick={() =>
                    setSort(
                      sort === Status.Date ? Status.InverseDate : Status.Date
                    )
                  }
                >
                  <Arrow
                    className={`h-2 mr-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      Status.Date
                    )}`}
                  />
                  {t('year')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <tr className="border-b-[1px] border-primary-900 tracking-widest text-2xl child:py-2 group child-hover:cursor-image hover:bg-primary-300 hover:text-primary-100">
                  <td className="hidden md:table-cell pl-16 lg:pl-32 pr-16 lg:pr-64">
                    <div className="flex flex-row items-center w-max">
                      <span>{project.title}</span>
                      <LinkChain className="px-2 w-max opacity-0 group-hover:opacity-100 transform transition duration-500" />
                    </div>
                  </td>
                  <td className="hidden md:table-cell lg:pl-20">
                    {project.location}
                  </td>
                  <td className="hidden md:table-cell px-5">
                    {t(project.status)}
                  </td>
                  <td className="text-center md:text-left px-5">
                    <span className="hidden md:table-cell">
                      {getProjectYear(project.date)}
                    </span>
                    <button
                      className="md:hidden"
                      onClick={() => expandYear(project.date)}
                    >
                      {getProjectYear(project.date)}
                    </button>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row-reverse w-screen justify-between">
          <Link href={`/projects/${projects[0]?.slug}`}>
            <a>
              <Arrow className="h-6 md:h-8 m-8 rotate-180" />
            </a>
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      projects: content,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Projects;
