import matter from 'gray-matter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Navbar, Meta } from 'Components';

const Projects = (props: {
  projects: {
    frontmatter: {
      [key: string]: any;
    };
    markdownBody: string;
    slug: string;
  }[];
}) => {
  const { t } = useTranslation('common');
  const projectsIntro = t<string, string[]>('projects', {
    returnObjects: true,
  });
  return (
    <>
      <Meta title={t('title_projects')} description={t('description')} />
      <Navbar title={t('title_projects')} />
      <main className="inline-block w-full mt-32 lg:mt-48 rounded-lg relative overflow-x-auto">
        <div className="pl-8 md:pl-16 lg:pl-32 pr-32 md:pr-32 lg:pr-64 xl:pr-96 2xl:pr-[40rem] leading-[28px] md:leading-[30px] xl:leading-[40px] text-[22px] md:text-2xl xl:text-3xl line-clamp-5 hover:line-clamp-none mb-12">
          {projectsIntro.map((paragraph, pNum) => (
            <p key={pNum} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
        <table className="table-fixed w-screen">
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                className="bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {props.projects.map((project) => (
              <tr key={project.slug}>
                <td className="px-10 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <Link href={`/projects/${project.slug}`}>
                    {project.frontmatter.title}
                  </Link>
                </td>
                <td className="px-10 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {project.frontmatter.location}
                </td>
                <td className="px-10 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {project.frontmatter.status}
                </td>
                <td className="px-10 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {project.frontmatter.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const projects = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key: string, index: number) => {
      const slug = key
        .replace(/^.*[\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');

      const value: any = values[index];

      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });
    return data;
  })(require.context('../../../projects', true, /\.md$/));

  return {
    props: {
      projects,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Projects;
