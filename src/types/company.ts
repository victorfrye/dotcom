class Company {
  name: string;
  location: string;
  description: string;
  url: string;

  constructor(
    name: string,
    location: string,
    description: string,
    url: string,
  ) {
    this.name = name;
    this.location = location;
    this.description = description;
    this.url = url;
  }
}

export default Company;

export { Company };
