class School {
  name: string;
  degree: string;
  major: string;
  location: string;
  grade: string | undefined;
  startDate: Date;
  graduationDate: Date | undefined;
  description: string;
  url: string;

  public constructor(
    name: string,
    degree: string,
    major: string,
    location: string,
    grade: string | undefined,
    startDate: Date,
    graduationDate: Date | undefined,
    description: string,
    url: string
  ) {
    this.name = name;
    this.degree = degree;
    this.major = major;
    this.location = location;
    this.grade = grade;
    this.startDate = startDate;
    this.graduationDate = graduationDate;
    this.description = description;
    this.url = url;
  }
}

export default School;

export {
  School,
}
