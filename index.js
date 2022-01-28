#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
// import gradient from 'gradient';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.bgCyan('Hi Zayn!'));

let playerName;


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a millionaire?\n'
    );

    // keeps rainbow animation for Nth ms
    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('How to play...')}
        I am a process on your PC.
        If you get any questions wrong I will be ${chalk.bgRed('killed')}!
        So get all the questions right.
    `)

}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        }
    });

    playerName = answers.player_name;
}

async function question_1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'What year was COVID-19 discovered?',
        choices: [
            '2017',
            '2018',
            '2019',
            '2020'
        ]
    });

    return handleAnswer(answers.question_1 == '2019')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's correct!` });
    } else {
        spinner.error({ text: `Game over. You're a loser ${playerName}` });
        process.exit(1);
    }
}

// await welcome();
await askName();