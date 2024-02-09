import { Footer } from 'components/Footer';
import { Arrow, LinkChain } from 'components/Icons';
import { Meta } from 'components/Meta';
import { Navbar } from 'components/Navbar';
import { Tooltip } from 'components/Tooltip';
import { IProject, SortStatus as Sort } from 'interfaces';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import getProjectYear from 'utils/Dates';
import groupBy from 'utils/GroupBy';
import content from '../../../public/projects.json';

const Projects = ({ projects }: { projects: IProject[] }) => {
  const router = useRouter();
  const [sort, setSort] = useState(Sort.Date);
  const [tableData, setTableData] = useState(projects);
  const [mobileTableData] = useState(
    groupBy(tableData, (project: IProject) => getProjectYear(project.date)),
  );
  const [expandYear, setExpandYear] = useState('');
  const [target, setTarget] = useState('');

  const { t } = useTranslation('common');
  const projectsDescription = t('projects_description', {
    returnObjects: true,
  });

  const sortRotation = (sortArrow: Sort) => {
    if (sort % 2 === 0) {
      return sort === sortArrow ? '-rotate-90' : '-rotate-90 opacity-0';
    }
    return sort === sortArrow + 1 ? 'rotate-90' : '-rotate-90 opacity-0';
  };

  useEffect(() => {
    projects.sort((proj1, proj2) => {
      if (sort === Sort.Location) {
        return proj1.location.localeCompare(proj2.location);
      }
      if (sort === Sort.InvLocation) {
        return proj2.location.localeCompare(proj1.location);
      }
      if (sort === Sort.Status) {
        return proj1.status.localeCompare(proj2.status);
      }
      if (sort === Sort.InvStatus) {
        return proj2.status.localeCompare(proj1.status);
      }
      if (sort === Sort.Date) {
        return getProjectYear(proj2.date) - getProjectYear(proj1.date);
      }
      if (sort === Sort.InvDate) {
        return getProjectYear(proj1.date) - getProjectYear(proj2.date);
      }

      return 0;
    });
    setTableData([...projects]);
  }, [sort, projects]);

  return (
    <>
      <Meta title={t('projects_title')} description={t('description')} />
      <Navbar title={t('projects_title')} background />
      <main className='inline-block w-full rounded-lg pt-32'>
        <Link href={'/'}>
          <Arrow className='absolute left-8 hidden h-6 lg:block' />
        </Link>
        <div className='mb-12 break-normal px-8 text-xl leading-[28px] md:pr-32 md:text-2xl md:leading-[30px] lg:pl-24 lg:pr-64 xl:pl-48 xl:pr-96 xl:text-3xl xl:leading-[40px] 2xl:pr-[35rem]'>
          <p className='mb-2'>{projectsDescription[0]}</p>
        </div>
        <table className='w-screen table-fixed border-spacing-2 text-left'>
          <thead>
            <tr className='border-b-[1px] border-primary-900 text-lg tracking-widest child:font-light'>
              <th className='hidden md:table-cell md:w-[36%]' />
              <th className='hidden md:table-cell md:w-[27%]'>
                <button
                  type='button'
                  className='group inline-flex items-center leading-10'
                  onClick={() =>
                    setSort(
                      sort === Sort.Location ? Sort.InvLocation : Sort.Location,
                    )
                  }
                >
                  <Arrow
                    className={`mr-2 h-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      Sort.Location,
                    )}`}
                  />
                  {t('location')}
                </button>
              </th>
              <th className='hidden px-5 md:table-cell md:w-[20%]'>
                <button
                  type='button'
                  className='group inline-flex items-center leading-10'
                  onClick={() =>
                    setSort(sort === Sort.Status ? Sort.InvStatus : Sort.Status)
                  }
                >
                  <Arrow
                    className={`mr-2 h-2 transform transition duration-500 group-hover:opacity-100 ${sortRotation(
                      Sort.Status,
                    )}`}
                  />
                  {t('status')}
                </button>
              </th>
              <th className='flex items-center pl-8 md:w-3/12 md:px-5'>
                <button
                  type='button'
                  className='group inline-flex items-center leading-10'
                  onClick={() =>
                    setSort(sort === Sort.Date ? Sort.InvDate : Sort.Date)
                  }
                >
                  <Arrow
                    className={`mr-2 hidden h-2 transform transition duration-500 group-hover:opacity-100 md:block ${sortRotation(
                      Sort.Date,
                    )}`}
                  />
                  {t('year')}
                </button>
              </th>
            </tr>
          </thead>
          {target && (
            <Tooltip offset={{ x: 25, y: -210 }}>
              <Image
                src={`/assets/${target}.png`}
                alt={`${target} tooltip`}
                width={270}
                height={420}
                className='z-10 hidden md:block'
                priority
              />
            </Tooltip>
          )}
          <tbody>
            {tableData.map((project) => (
              <tr
                key={project.slug}
                className='group hidden cursor-pointer border-b-[1px] border-primary-900 text-2xl tracking-widest hover:bg-primary-300 hover:text-primary-100 child:hidden child:py-2 md:table-row child:md:table-cell'
                onClick={() => router.push(`/projects/${project.slug}`)}
                onKeyDown={() => router.push(`/projects/${project.slug}`)}
                onMouseEnter={() => setTarget(project.slug)}
                onMouseLeave={() => setTarget('')}
              >
                <Head>
                  <link
                    rel='preload'
                    href={`/assets/${target}.png`}
                    as='image'
                  />
                </Head>
                <td className='pl-8 pr-16 lg:pl-24 lg:pr-64 xl:pl-48'>
                  <div className='flex w-max flex-row items-center'>
                    <span>{project.title}</span>
                    <LinkChain className='w-max transform px-2 text-primary-100 opacity-0 transition duration-500 group-hover:opacity-100' />
                  </div>
                </td>
                <td>{project.location}</td>
                <td className='px-5'>{t(project.status)}</td>
                <td className='px-5 text-center md:text-left'>
                  <span>{getProjectYear(project.date)}</span>
                </td>
              </tr>
            ))}
            {Array.from(mobileTableData.keys())
              .sort((_proj1, proj2) => -proj2)
              .map((year) => (
                <tr
                  key={year}
                  className={twMerge(
                    'cursor-pointer border-b-[1px] border-primary-900 text-2xl tracking-widest md:hidden',
                    expandYear === year && 'bg-primary-300 text-primary-100',
                  )}
                >
                  <td
                    className='flex flex-col p-0'
                    onClick={() =>
                      setExpandYear(expandYear === year ? '' : year)
                    }
                    onKeyDown={() =>
                      setExpandYear(expandYear === year ? '' : year)
                    }
                  >
                    <span className='px-5 py-2 text-center'>{year}</span>
                    {expandYear === year &&
                      mobileTableData.get(year)?.map((project) => (
                        <Link
                          key={`${year}-expanded-${project.slug}`}
                          className='border-t-[1px] border-primary-900 bg-primary-300 px-5 py-2 text-center text-2xl tracking-widest text-primary-100 hover:text-primary-900'
                          href={`/projects/${project.slug}`}
                        >
                          {project.title}
                        </Link>
                      ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className='flex w-screen flex-row justify-between'>
          <Link href='/'>
            <Arrow className='m-8 flex h-6 lg:hidden' />
          </Link>
        </div>
      </main>
      <Footer />
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
