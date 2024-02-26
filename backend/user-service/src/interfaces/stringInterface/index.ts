// Converts all keys in object to string
export type StringInterface<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? Array<StringInterface<U>>
    : T[P] extends Date
    ? string
    : T[P] extends object
    ? StringInterface<T[P]> // recurse on object T[P]
    : string;
};
