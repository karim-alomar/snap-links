export type APIActionResponse<T> = {
  data: {
    data: T;
    token?: string;
    messages: MessagesType;
  };
};

export type MessagesType = {
  error: string;
  success: string;
};

export type APIResponse<T> = {
  data: Array<T>;
  messages: MessagesType;
};

export type APIResponseDatum<T> = {
  data: T;
  messages: MessagesType;
};
