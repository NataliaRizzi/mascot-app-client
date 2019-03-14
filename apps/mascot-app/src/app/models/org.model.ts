export class Org {
  // constructor(
  //   public _id: string,
  //   public name: string,
  //   public location: string,
  //   public email: string,
  //   public web?: string
  // ) { }

  // why an Id ? is being create by the db
  _id: string;
  name: string;
  location: string;
  email: string;
  web: string;
  queries: [{}];
  pets: { pet_id: string }[];
}
