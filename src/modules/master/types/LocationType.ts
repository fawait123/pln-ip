export interface LocationInterface {
  color: string;
  created_at: string;
  updated_at: string;
  lat: string;
  lon: string;
  name: string;
  slug: string;
  uuid: string;
  description: string;
}

export interface LocationCreateInterface {
  name: string;
  lat: string;
  lon: string;
  slug: string;
  description: string;
  color: string;
}
