export type Query<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? Array<{
        value?: U;
        order: "asc" | "desc";
        sortBy: boolean;
      }>
    : {
        value?: T[K];
        order: "asc" | "desc";
        sortBy: boolean;
      };
} & {
  limit: string;
  offset: string;
};

// converts an object to a query of an object, where each property has "order" and "sort" fields.