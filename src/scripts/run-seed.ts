#!/usr/bin/env node
// ? For interactive confirmation prompts
import { confirm } from '@clack/prompts'
// ? For colored terminal output
import chalk from 'chalk'
// ? To load environment variables from a .env file
import 'dotenv/config'
// ? For special characters (tick and cross) in output
import figures from 'figures'
// ? For MongoDB database operations
import { MongoClient } from 'mongodb'
// ? For displaying a loading spinner
import ora, { Ora } from 'ora'

// ! For running shell commands (if needed for additional tasks)
import { seedContactPage } from '@/seed/contact-page'
import { seedCostsBreakdown } from '@/seed/costs-breakdown'
import { seedCostsBreakdownDetailsPageData } from '@/seed/costs-breakdown-details-page'
import { seedForms } from '@/seed/forms'
import { seedHomePage } from '@/seed/home-page'
import { seedQuoteDetailsPage } from '@/seed/quote-details-page'
import { seedQuotes } from '@/seed/quotes'
import { seedSiteSettings } from '@/seed/site-settings'
import { seedTerms } from '@/seed/terms'
import { seedUsers } from '@/seed/users/seed'

// Extract database name from the URI
const extractDatabaseName = (uri: string): string | null => {
  const match = uri.match(/\/([^/?]+)(\?|$)/)
  return match ? match[1] : null
}

// MongoDB connection URI
const { DATABASE_URI } = process.env

if (!DATABASE_URI) {
  console.error(chalk.red('Environment variable DATABASE_URI is required.'))
  process.exit(1)
}

const databaseName = extractDatabaseName(DATABASE_URI)
if (!databaseName) {
  console.error(chalk.red('Failed to extract database name from DATABASE_URI.'))
  process.exit(1)
}

// Function to drop the MongoDB database
const dropDatabase = async (): Promise<boolean> => {
  const client = new MongoClient(DATABASE_URI)
  try {
    await client.connect()
    console.log(
      chalk.green(
        `Connected to MongoDB.\nDropping the database "${databaseName}"...`,
      ),
    )
    const db = client.db(databaseName)
    await db.dropDatabase()
    console.log(chalk.green(`Database "${databaseName}" dropped successfully.`))
    return true
  } catch (error) {
    console.error(chalk.red('Error dropping the database:'), error)
    return false
  } finally {
    await client.close()
  }
}

// Function to execute the seeding process
const executeSeeding = async (): Promise<void> => {
  const spinner = ora({
    text: 'Starting the seeding process...',
    color: 'cyan',
    spinner: 'dots',
  }).start()

  try {
    await seedUsers({ spinner })
    await seedSiteSettings(spinner)
    await seedCostsBreakdown(spinner)
    await seedTerms(spinner)
    await seedForms(spinner) // Assume this returns seeded forms
    await seedQuotes(spinner)
    await seedHomePage(spinner)
    await seedQuoteDetailsPage(spinner)
    await seedCostsBreakdownDetailsPageData(spinner)
    await seedContactPage(spinner)
  } catch (error) {
    console.error(chalk.red('Error running seeds:'), error)
  } finally {
    spinner.stop()
    console.log(chalk.green('Seeding completed.'))
    process.exit(0)
  }
}

// Function to log the seeding process with spinner and messages
const seedAndLog = async <T>(
  message: string,
  seedFunction: () => Promise<any>,
  spinner: Ora,
): Promise<void> => {
  spinner.start(`${message}...`)
  try {
    await seedFunction()
    spinner.succeed(`${message} ${chalk.green(figures.tick)} Done.`)
  } catch (error) {
    spinner.fail(`${message} ${chalk.red(figures.cross)} Failed.`)
    throw error
  }
}

// Function to ask for confirmation to drop the database before seeding
const askToDropDatabase = async (): Promise<void> => {
  const answer = await confirm({
    message: `${chalk.bold(
      'Do you want to drop the database before seeding?',
    )}\n\t${chalk.red.bold(
      'WARNING: Dropping the database will permanently delete all data. This action cannot be undone.',
    )}`,
    initialValue: false,
  })

  if (answer) {
    const dropSuccess = await dropDatabase()
    if (dropSuccess) {
      askForConfirmation()
    } else {
      console.error(
        chalk.red('Failed to drop the database. Seeding process aborted.'),
      )
      process.exit(1)
    }
  } else {
    askForConfirmation()
  }
}

// Function to ask for confirmation before running seeds
const askForConfirmation = async (): Promise<void> => {
  const answer = await confirm({
    message: 'Are you sure you want to run the seeding process?',
    initialValue: false,
  })

  if (answer) {
    executeSeeding()
  } else {
    console.log(chalk.yellow('Seeding process cancelled.'))
    process.exit(0)
  }
}

// Display the prompt to drop the database
askToDropDatabase()
