import { Command } from 'commander';
import * as faker from '@faker-js/faker';
import { createObjectCsvWriter } from 'csv-writer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const USERS = 1000;
const REVIEWS = 1000;
const DEVELOPERS = 1000;
const ADMINS = 1000;
const APPS = 1000;

export class CsvGenerator {
  async generateUsersCsv() {
    let data = [];

    // Generate users data
    for (let i = 0; i < USERS; i++) {
      data.push({
        userId: i,
        username: faker.faker.internet.userName(),
        email: faker.faker.internet.email(),
        password: faker.faker.internet.password(),
        firstName: faker.faker.name.firstName(),
        lastName: faker.faker.name.lastName(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'users.csv',
      header: [
        { id: 'userId', title: 'User Id' },
        { id: 'username', title: 'Username' },
        { id: 'email', title: 'Email' },
        { id: 'password', title: 'Password' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Users CSV file generated successfully!');
  }

  async generateReviewsCsv() {
    let data = [];

    // Generate reviews data
    for (let i = 0; i < REVIEWS; i++) {
      data.push({
        reviewId: i,
        appId: faker.faker.datatype.number({ min: 1, max: APPS }),
        userId: faker.faker.datatype.number({ min: 1, max: USERS }),
        rating: faker.faker.datatype.number({ min: 1, max: 5 }),
        text: faker.faker.lorem.sentence(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'reviews.csv',
      header: [
        { id: 'reviewId', title: 'Review ID' },
        { id: 'appId', title: 'App Id' },
        { id: 'userId', title: 'User Id' },
        { id: 'rating', title: 'Rating' },
        { id: 'text', title: 'Text' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Reviews CSV file generated successfully!');
  }

  async generateDevelopersCsv() {
    let data = [];

    // Generate developers data
    for (let i = 0; i < DEVELOPERS; i++) {
      data.push({
        developerId: i,
        username: faker.faker.internet.userName(),
        email: faker.faker.internet.email(),
        password: faker.faker.internet.password(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'developers.csv',
      header: [
        { id: 'developerId', title: 'Developer Id' },
        { id: 'username', title: 'Username' },
        { id: 'email', title: 'Email' },
        { id: 'password', title: 'Password' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Developers CSV file generated successfully!');
  }

  async generateAppsCsv() {
    let data = [];

    for (let i = 0; i < APPS; i++) {
      data.push({
        appId: i,
        name: faker.faker.commerce.productName(),
        category: faker.faker.commerce.department(),
        description: faker.faker.lorem.paragraph(),
        rating: parseFloat(faker.faker.finance.amount(0, 5, 1)),
        price: parseFloat(faker.faker.finance.amount(0, 100, 2)),
        downloads: faker.faker.datatype.number({ max: 100000 }),
        isVerified: faker.faker.datatype.boolean(),
        developerId: faker.faker.datatype.number({ max: DEVELOPERS }),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'apps.csv',
      header: [
        { id: 'appId', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'category', title: 'Category' },
        { id: 'description', title: 'Description' },
        { id: 'rating', title: 'Rating' },
        { id: 'price', title: 'Price' },
        { id: 'downloads', title: 'Downloads' },
        { id: 'isVerified', title: 'Is Verified' },
        { id: 'developerId', title: 'Developer ID' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Apps CSV file generated successfully!');
  }

  async generateAdminsCsv() {
    const data = [];

    for (let i = 0; i < ADMINS; i++) {
      data.push({
        adminId: i,
        adminUsername: faker.faker.internet.userName(),
        email: faker.faker.internet.email(),
        adminPassword: faker.faker.internet.password(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'admins.csv',
      header: [
        { id: 'adminId', title: 'Admin ID' },
        { id: 'adminUsername', title: 'Admin Username' },
        { id: 'email', title: 'Email' },
        { id: 'adminPassword', title: 'Admin Password' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('CSV file generated successfully!');
  }
}

const program = new Command();
const myCsvGenerator = new CsvGenerator();
program
  .command('generate')
  .description('Generate CSV file with sample data for all tables')
  .option('output.csv')
  .action(async ({}) => {
    await myCsvGenerator.generateUsersCsv();
    await myCsvGenerator.generateReviewsCsv();
    await myCsvGenerator.generateDevelopersCsv();
    await myCsvGenerator.generateAdminsCsv();
    await myCsvGenerator.generateAppsCsv();
  });

program.parse(process.argv);
