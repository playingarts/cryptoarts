export type HomeCard = {
  _id: string;
  img: string;
  cardBackground: string;
  edition?: string;
  deck?: {
    slug: string;
  };
  artist?: {
    slug: string;
    name?: string;
    country?: string;
  };
};
