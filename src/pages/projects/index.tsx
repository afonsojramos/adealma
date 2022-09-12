import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Navbar, Meta, Footer, Tooltip, Arrow, LinkChain } from 'Components';
import { IProject, SortStatus } from 'Interfaces';
import { getProjectYear, groupBy } from 'Utils';

import content from '../../../public/projects.json';

const Projects = ({ projects }: { projects: IProject[] }) => {
  const [sort, setSort] = useState(SortStatus.Date);
  const [tableData] = useState(projects);
  const [mobileTableData] = useState(
    groupBy(tableData, (project: IProject) => getProjectYear(project.date))
  );
  const [expandYear, setExpandYear] = useState('');

  const { t } = useTranslation('common');
  const projectsDescription = t<string, string[]>('projects_description', {
    returnObjects: true,
  });

  const sortRotation = (sortArrow: SortStatus) => {
    if (sort % 2 === 0)
      return sort === sortArrow ? '-rotate-90' : '-rotate-90 opacity-0';
    return sort === sortArrow + 1 ? 'rotate-90' : '-rotate-90 opacity-0';
  };

  const handleSorting = () => {
    tableData.sort((proj1, proj2) => {
      if (sort === SortStatus.Location) {
        return proj1.location.localeCompare(proj2.location);
      }
      if (sort === SortStatus.InverseLocation) {
        return proj2.location.localeCompare(proj1.location);
      }
      if (sort === SortStatus.Status) {
        return proj1.status.localeCompare(proj2.status);
      }
      if (sort === SortStatus.InverseStatus) {
        return proj2.status.localeCompare(proj1.status);
      }
      if (sort === SortStatus.Date) {
        return getProjectYear(proj1.date) - getProjectYear(proj2.date);
      }
      if (sort === SortStatus.InverseDate) {
        return -getProjectYear(proj1.date) - getProjectYear(proj2.date);
      }

      return 0;
    });
  };

  return (
    <>
      <Meta title={t('projects_title')} description={t('description')} />
      <div className="child:bg-primary-100">
        <Navbar title={t('projects_title')} />
      </div>
      <main className="inline-block w-full mt-32 lg:mt-32 rounded-lg overflow-x-auto">
        <Link href={`/`}>
          <a>
            <Arrow className="absolute left-8 h-6 hidden lg:block" />
          </a>
        </Link>
        <div className="pl-8 lg:pl-24 xl:pl-48 pr-32 md:pr-32 lg:pr-64 xl:pr-96 2xl:pr-[35rem] leading-[28px] md:leading-[30px] xl:leading-[40px] text-[22px] md:text-2xl xl:text-3xl mb-12 break-normal">
          {projectsDescription.map((paragraph, pNum) => (
            <p key={pNum} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
        <table className="table-fixed w-screen text-left border-spacing-2">
          <thead>
            <tr className="border-b-[1px] border-primary-900 tracking-widest text-lg child:font-light">
              <th className="hidden md:table-cell md:w-[36%]" />
              <th className="hidden md:table-cell md:w-[27%]">
                <button
                  className="group inline-flex items-center leading-10"
                  onClick={() => {
                    setSort(
                      sort === SortStatus.Location
                        ? SortStatus.InverseLocation
                        : SortStatus.Location
                    );
                    handleSorting();
                  }}
                >
                  <Arrow
                    className={`h-2 mr-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      SortStatus.Location
                    )}`}
                  />
                  {t('location')}
                </button>
              </th>
              <th className="hidden md:table-cell md:w-[20%] px-5">
                <button
                  className="group inline-flex items-center leading-10"
                  onClick={() => {
                    setSort(
                      sort === SortStatus.Status
                        ? SortStatus.InverseStatus
                        : SortStatus.Status
                    );
                    handleSorting();
                  }}
                >
                  <Arrow
                    className={`h-2 mr-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      SortStatus.Status
                    )}`}
                  />
                  {t('status')}
                </button>
              </th>
              <th className="flex items-center md:w-3/12 pl-8 md:px-5">
                <button
                  className="group inline-flex items-center leading-10"
                  onClick={() => {
                    setSort(
                      sort === SortStatus.Date
                        ? SortStatus.InverseDate
                        : SortStatus.Date
                    );
                    handleSorting();
                  }}
                >
                  <Arrow
                    className={`hidden md:block h-2 mr-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      SortStatus.Date
                    )}`}
                  />
                  {t('year')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((project) => (
              <Tooltip key={project.slug} slug={project.slug}>
                <tr className="border-b-[1px] border-primary-900 tracking-widest text-2xl child:py-2 group hover:bg-primary-300 hover:text-primary-100 hidden md:table-row child:hidden child:md:table-cell cursor-pointer">
                  <td className="pl-8 lg:pl-24 xl:pl-48 pr-16 lg:pr-64">
                    <div className="flex flex-row items-center w-max">
                      <span>{project.title}</span>
                      <LinkChain className="px-2 w-max opacity-0 group-hover:opacity-100 transform transition duration-500 text-primary-100" />
                    </div>
                  </td>
                  <td>{project.location}</td>
                  <td className="px-5">{t(project.status)}</td>
                  <td className="text-center md:text-left px-5">
                    <span>{getProjectYear(project.date)}</span>
                  </td>
                </tr>
              </Tooltip>
            ))}
            {projects.map((project) => (
              <tr
                key={project.slug}
                className="border-b-[1px] border-primary-900 tracking-widest text-2xl child:py-2 hover:bg-primary-300 hover:text-primary-100 md:hidden"
              >
                <td className="text-center md:text-left px-5">
                  <button className="" onClick={() => expandYear(project.date)}>
                    {getProjectYear(project.date)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row-reverse w-screen justify-between">
          <Link href={`/projects/${projects[0]?.slug}`}>
            <a>
              <Arrow className="h-6 m-8 rotate-180" />
            </a>
          </Link>
          <Link href="/">
            <a>
              <Arrow className="h-6 m-8 flex lg:hidden" />
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
