export interface ITask {
  assignees: [
    {
      created: string;
      email: string;
      id: number;
      name: string;
      updated: string;
      username: string;
    },
  ];
  attachments: [
    {
      created: string;
      created_by: {
        created: string;
        email: string;
        id: number;
        name: string;
        updated: string;
        username: string;
      };
      file: {
        created: string;
        id: number;
        mime: string;
        name: string;
        size: number;
      };
      id: number;
      task_id: number;
    },
  ];
  bucket_id: number;
  buckets: [
    {
      count: number;
      created: string;
      created_by: {
        created: string;
        email: string;
        id: number;
        name: string;
        updated: string;
        username: string;
      };
      id: number;
      limit: number;
      position: number;
      project_view_id: number;
      tasks: Array<any>;
      title: string;
      updated: string;
    },
  ];
  comments: [
    {
      author: {
        created: string;
        email: string;
        id: number;
        name: string;
        updated: string;
        username: string;
      };
      comment: string;
      created: string;
      id: number;
      reactions: {
        property1: [
          {
            created: string;
            email: string;
            id: number;
            name: string;
            updated: string;
            username: string;
          },
        ];
        property2: [
          {
            created: string;
            email: string;
            id: number;
            name: string;
            updated: string;
            username: string;
          },
        ];
      };
      updated: string;
    },
  ];
  cover_image_attachment_id: number;
  created: string;
  created_by: {
    created: string;
    email: string;
    id: number;
    name: string;
    updated: string;
    username: string;
  };
  description: string;
  done: true;
  done_at: string;
  due_date: string;
  end_date: string;
  hex_color: string;
  id: number;
  identifier: string;
  index: number;
  is_favorite: true;
  labels: [
    {
      created: string;
      created_by: {
        created: string;
        email: string;
        id: number;
        name: string;
        updated: string;
        username: string;
      };
      description: string;
      hex_color: string;
      id: number;
      title: string;
      updated: string;
    },
  ];
  percent_done: number;
  position: number;
  priority: number;
  project_id: number;
  reactions: {
    property1: [
      {
        created: string;
        email: string;
        id: number;
        name: string;
        updated: string;
        username: string;
      },
    ];
    property2: [
      {
        created: string;
        email: string;
        id: number;
        name: string;
        updated: string;
        username: string;
      },
    ];
  };
  related_tasks: {
    property1: Array<any>;
    property2: Array<any>;
  };
  reminders: [
    {
      relative_period: number;
      relative_to: string;
      reminder: string;
    },
  ];
  repeat_after: number;
  repeat_mode: number;
  start_date: string;
  subscription: {
    created: string;
    entity: number;
    entity_id: number;
    id: number;
  };
  title: string;
  updated: string;
}
