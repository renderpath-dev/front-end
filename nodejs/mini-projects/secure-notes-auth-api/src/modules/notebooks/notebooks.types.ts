export type NotebookDto = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type NotebookRecord = {
  id: string;
  ownerId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
