export interface IProject {
  background_blur_hash: string;
  background_information: null;
  created: string;
  description: string;
  hex_color: string;
  id: number;
  identifier: string;
  is_archived: true;
  is_favorite: true;
  max_right: number;
  owner: {
    created: string;
    email: string;
    id: number;
    name: string;
    updated: string;
    username: string;
  };
  parent_project_id: number;
  position: number;
  subscription: {
    created: string;
    entity: number;
    entity_id: number;
    id: number;
  };
  title: string;
  updated: string;
  views: [
    {
      bucket_configuration: [
        {
          filter: {
            filter: string;
            filter_include_nulls: true;
            order_by: string[];
            s: string;
            sort_by: string[];
          };
          title: string;
        },
      ];
      bucket_configuration_mode: number;
      created: string;
      default_bucket_id: number;
      done_bucket_id: number;
      filter: {
        filter: string;
        filter_include_nulls: true;
        order_by: string[];
        s: string;
        sort_by: string[];
      };
      id: number;
      position: number;
      project_id: number;
      title: string;
      updated: string;
      view_kind: number;
    },
  ];
}
