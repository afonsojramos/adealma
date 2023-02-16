export type IProject = {
  title: string;
  location: string;
  status: 'ongoing' | 'sold';
  images: {
    filename: string;
    alt: string;
  }[];
  date: string;
  endDate: string;
  slug: 'casa-do-cristelo' | 'casa-do-pescador' | 'casas-da-matriz';
};
