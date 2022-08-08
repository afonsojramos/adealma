import matter from 'gray-matter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Navbar, Banner, Footer } from '../../components';
import { Meta, Background } from '../../components/elements';

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
  return (
    <main className="antialiased text-gray-600">
      <Meta title={t('title_about')} description={t('description')} />
      <Background color="bg-gray-100" classnames="h-screen">
        <Navbar />
        <div className="inline-block w-full rounded-lg relative overflow-x-auto px-10">
          <table className="table-fixed w-full">
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
        </div>
      </Background>
      <Banner />
      <Footer />
    </main>
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
