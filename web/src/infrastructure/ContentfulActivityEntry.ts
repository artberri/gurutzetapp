export interface ContentfulActivityEntry {
  readonly sys: {
    readonly id: string;
    readonly type: "Entry" | "DeletedEntry";
    readonly contentType: {
      readonly sys: {
        id: "activity";
      };
    };
  };

  readonly fields: {
    description: {
      es: string;
      eu: string;
    };
    date: {
      es: string;
    };
    category: {
      es: {
        readonly sys: {
          readonly id: string;
          readonly type: "Entry" | "DeletedEntry";
          readonly contentType: {
            readonly sys: {
              id: "category";
            };
          };
        };
        fields: {
          label: {
            es: string;
          };
          name: {
            es: string;
            eu: string;
          };
        };
      };
    };
  };
}
